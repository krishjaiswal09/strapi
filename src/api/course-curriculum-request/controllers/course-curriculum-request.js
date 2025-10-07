'use strict';

/**
 * course-curriculum-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course-curriculum-request.course-curriculum-request');

module.exports = createCoreController('api::course-curriculum-request.course-curriculum-request', ({ strapi }) => ({

    async post(ctx) {

        let body = JSON.parse(ctx.request.body)

        const { first_name, last_name, email, phone, artforms } = body;

        // Step 1: Send an email notification
        await strapi.plugin('email').service('email').send({
            to: process.env.CAREER_EMAIL,
            from: process.env.SMTP_USERNAME,
            subject: `New free trial form received.`,
            html: `<div>${Object.keys(body).filter(n => !["checkbox", "country_code", "button", "file"].includes(n))
                .map(n => `${n.toUpperCase()} :- ${body[n]}`).join('<br>')} 
                <br></div>`,
        });

        // Step 2: Insert the career form data into your database
        const career = await strapi.db.connection.raw(`
            INSERT INTO course_curriculum_requests (first_name, last_name, phone, email, artforms) 
            VALUES ('${first_name}', '${last_name}', ${phone}, '${email}', '${artforms}')
        `);

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
                        { "Attribute": "mx_Skill", "Value": artforms },
                        { "Attribute": "Source", "Value": "Course curriculum requests" } // Adjust or add more fields as needed
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