'use strict';
const axios = require('axios');
/**
 * become-a-teacher controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::become-a-teacher.become-a-teacher', ({ strapi }) => ({

    async post(ctx) {

        let { first_name, last_name, phone, skill, sub_skill, message, email, button = false, file, country } = ctx.request.body

        await strapi.plugin('email').service('email').send({
            to: process.env.TEACHER_EMAIL,
            from: process.env.SMTP_USERNAME,
            subject: `New teacher application received.`,
            html: `<div>${Object.keys(ctx.request.body).filter(n => !["checkbox", "country_code", "button", "file"].includes(n)).map(n => `${n.toUpperCase()} :- ${ctx.request.body[n]}`).join('<br>')} <br> <br> ${button ? `<a href=${button}> <button type="button">Download Attachment</button></a>` : ''}</div>`,
        });

        let teacher = await strapi.db.connection.raw(`INSERT INTO become_a_teachers (first_name, last_name, phone, email, skill, sub_skill, message) VALUES ('${first_name}', '${last_name}', ${phone}, '${email}', '${skill}', '${sub_skill}', '${message}')`);

        if (file) {
            await strapi.db.connection.raw(`
                INSERT INTO files_related_morphs (file_id, related_id, related_type, field) 
                VALUES (${file}, ${teacher[0].insertId}, 'api::become-a-teacher.become-a-teacher', 'file')
            `);
        }


        (async () => {
            try {
                await axios.post(
                    `${process.env.LEADSQUARED_HOST}LeadManagement.svc/Lead.Create?accessKey=${process.env.LEADSQUARED_ACCESS_KEY}&secretKey=${process.env.LEADSQUARED_SECRET_KEY}`,
                    [
                        { "Attribute": "FirstName", "Value": first_name },
                        { "Attribute": "LastName", "Value": last_name },
                        { "Attribute": "EmailAddress", "Value": email },
                        { "Attribute": "Phone", "Value": phone },
                        { "Attribute": "mx_Country", "Value": country },
                        { "Attribute": "mx_Interested_In1", "Value": `${skill} - ${sub_skill}` },
                        { "Attribute": "Notes", "Value": message },
                        { "Attribute": "Source", "Value": "Become A Teacher" } // Adjust or add more fields as needed
                    ],
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log('Lead successfully sent to LeadSquared');
            } catch (error) {
                console.error('LeadSquared Integration Error (Fire-and-Forget):', error.message);
            }
        })();


        return { success: 1, message: "Your form has been submitted successfully. We will get back to you" }
    }
}));
