'use strict';

/**
 * festive-leads-gift controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::festive-leads-gift.festive-leads-gift', ({ strapi }) => ({

    async post(ctx) {

        let body = JSON.parse(ctx.request.body)

        const { sender_name, sender_email, sender_phone, sender_country, receiver_name, receiver_email, receiver_phone, receiver_country, package_name } = body;

        await strapi.db.connection.raw(`
            INSERT INTO festive_leads_gifts (sender_name, sender_phone, sender_email, sender_country, receiver_name, receiver_phone, receiver_email, receiver_country, package_name) 
            VALUES ('${sender_name}', ${sender_phone}, '${sender_email}', '${sender_country}','${receiver_name}', ${receiver_phone}, '${receiver_email}', '${receiver_country}', '${package_name}')
        `);

        // Step 1: Send an email notification
        await strapi.plugin('email').service('email').send({
            to: process.env.CAREER_EMAIL,
            from: process.env.SMTP_USERNAME,
            subject: `New free trial form received.`,
            html: `<div>${Object.keys(body).filter(n => !["checkbox", "country_code", "button", "file"].includes(n))
                .map(n => `${n.toUpperCase()} :- ${body[n]}`).join('<br>')} 
                <br></div>`,
        });

        await strapi.plugin('email').service('email').send({
            to: sender_email,
            from: process.env.SMTP_USERNAME,
            subject: `Welcome to Artgharana!`,
            html: `Thanks for making your purchase with us. We are excited to have you onboard. We will get in touch with you soon.`,
        });

        return { success: 1, message: "Your form has been submitted successfully. We will get back to you" };

    }

})
);
