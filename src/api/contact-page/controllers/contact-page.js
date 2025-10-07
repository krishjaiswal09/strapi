'use strict';
const axios = require('axios');
/**
 * contact-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-page.contact-page', ({ strapi }) => ({

    async post(ctx) {

        const body = JSON.parse(ctx.request.body);

        const { name, email, message, phone, button = false } = body

        // Step 1: Send an email notification
        await strapi.plugin('email').service('email').send({
            to: process.env.CONTACT_US_EMAIL,
            from: process.env.SMTP_USERNAME,
            subject: `New contact request form received.`,
            html: `<div>${Object.keys(body).filter(n => !["checkbox", "country_code", "button", "file"].includes(n))
                .map(n => `${n.toUpperCase()} :- ${body[n]}`).join('<br>')} 
            <br> <br> ${button ? `<a href=${button}> <button type="button">Download Attachment</button></a>` : ''}</div>`,
        });

        // Step 2: Insert the contact request data into your database
        await strapi.db.connection.raw(`
        INSERT INTO contact_uses (name, phone, email, message) 
        VALUES ('${name}', ${phone}, '${email}', '${message}')
    `);

        // Step 3: Fire-and-Forget LeadSquared Integration
        (async () => {
            try {
                await axios.post(
                    `${process.env.LEADSQUARED_HOST}LeadManagement.svc/Lead.Create?accessKey=${process.env.LEADSQUARED_ACCESS_KEY}&secretKey=${process.env.LEADSQUARED_SECRET_KEY}`,
                    [
                        { "Attribute": "FirstName", "Value": name },
                        { "Attribute": "EmailAddress", "Value": email },
                        { "Attribute": "Phone", "Value": phone },
                        { "Attribute": "Notes", "Value": message },
                        { "Attribute": "Source", "Value": "Contact page" } // Adjust or add more fields as needed
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
