'use strict';
const axios = require('axios');
/**
 * subscriber controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subscriber.subscriber', ({ strapi }) => ({

    async post(ctx) {
        const { email } = ctx.request.body;

        // Step 1: Insert the email into your database
        await strapi.db.connection.raw(`
            INSERT INTO subscribers (email) 
            VALUES ('${email}')
        `);

        // Step 2: Fire-and-Forget LeadSquared Integration
        (async () => {
            try {
                await axios.post(
                    `${process.env.LEADSQUARED_HOST}LeadManagement.svc/Lead.Create?accessKey=${process.env.LEADSQUARED_ACCESS_KEY}&secretKey=${process.env.LEADSQUARED_SECRET_KEY}`,
                    [
                        { "Attribute": "EmailAddress", "Value": email },
                        { "Attribute": "Source", "Value": "Subscription" } // Adjust or add more fields as needed
                    ],
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log('Subscription lead successfully sent to LeadSquared');
            } catch (error) {
                console.error('LeadSquared Integration Error (Fire-and-Forget):', error.message);
            }
        })();

        // Step 3: Return a success response immediately
        return { success: 1, message: "You have been subscribed successfully." };
    }
}));
