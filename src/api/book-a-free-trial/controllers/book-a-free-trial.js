'use strict';
const axios = require('axios');

/**
 * book-a-free-trial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book-a-free-trial.book-a-free-trial', ({ strapi }) => ({

    async post(ctx) {

        let body = JSON.parse(ctx.request.body)

        const { first_name, email, last_name, message, phone, country, artforms } = body;

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
        await strapi.db.connection.raw(`
            INSERT INTO book_a_free_trials (first_name, last_name, phone, email, message, country, artforms) 
            VALUES ('${first_name}', '${last_name}', ${phone}, '${email}', '${message || ''}', '${country}', '${artforms}')
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
                        { "Attribute": "mx_Country", "Value": country },
                        { "Attribute": "mx_Interested_In1", "Value": artforms },
                        { "Attribute": "Notes", "Value": message || '' },
                        { "Attribute": "Source", "Value": "Book free trial" } // Adjust or add more fields as needed
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
