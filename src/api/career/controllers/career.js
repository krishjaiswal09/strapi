'use strict';
const axios = require('axios');

/**
 * career controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::career.career', ({ strapi }) => ({

    async post(ctx) {
        const { first_name, email, button, last_name, message, phone, file } = ctx.request.body;

        // Step 1: Send an email notification
        await strapi.plugin('email').service('email').send({
            to: process.env.CAREER_EMAIL,
            from: process.env.SMTP_USERNAME,
            subject: `New career application form received.`,
            html: `<div>${Object.keys(ctx.request.body).filter(n => !["checkbox", "country_code", "button", "file"].includes(n))
                .map(n => `${n.toUpperCase()} :- ${ctx.request.body[n]}`).join('<br>')} 
                <br> <br> ${button ? `<a href=${button}> <button type="button">Download Attachment</button></a>` : ''}</div>`,
        });

        // Step 2: Insert the career form data into your database
        const career = await strapi.db.connection.raw(`
            INSERT INTO careers (first_name, last_name, phone, email, message) 
            VALUES ('${first_name}', '${last_name}', ${phone}, '${email}', '${message || ''}')
        `);

        if (file) {
            await strapi.db.connection.raw(`
                INSERT INTO files_related_morphs (file_id, related_id, related_type, field) 
                VALUES (${file}, ${career[0].insertId}, 'api::career.career', 'file')
            `);
        }

        // Step 3: Fire-and-Forget LeadSquared Integration
        (async () => {
            try {
                await axios.post(
                    `${process.env.LEADSQUARED_HOST}LeadManagement.svc/Lead.Create?accessKey=${process.env.LEADSQUARED_ACCESS_KEY}&secretKey=${process.env.LEADSQUARED_SECRET_KEY}`,
                    [
                        { "Attribute": "FirstName", "Value": first_name },
                        { "Attribute": "LastName", "Value": last_name },
                        { "Attribute": "EmailAddress", "Value": email },
                        { "Attribute": "Phone", "Value": phone },
                        { "Attribute": "Notes", "Value": message || '' },
                        { "Attribute": "Source", "Value": "Join our sales team" } // Adjust or add more fields as needed
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

        // Step 4: Return a success response immediately
        return { success: 1, message: "Your form has been submitted successfully. We will get back to you" };
    }

}));
