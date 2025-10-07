'use strict';

/**
 * festive-leads-main controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::festive-leads-main.festive-leads-main', ({ strapi }) => ({

    async post(ctx) {

        console.log(ctx.request.body);
        let body = JSON.parse(ctx.request.body)

        const { name, email, phone, country, package_name } = body;

        // Step 2: Insert the career form data into your database
        await strapi.db.connection.raw(`
            INSERT INTO festive_leads_mains (name, phone, email, country, package_name) 
            VALUES ('${name}', ${phone}, '${email}', '${country}', '${package_name}')
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
            to: email,
            from: process.env.SMTP_USERNAME,
            subject: `Welcome to Artgharana!`,
            html: `Thanks for making your purchase with us. We are excited to have you onboard. We will get in touch with you soon.`,
        });

        return { success: 1, message: "Your form has been submitted successfully. We will get back to you" };

    }

})
);
