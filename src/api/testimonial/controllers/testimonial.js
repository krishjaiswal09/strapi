'use strict';

/**
 * testimonial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::testimonial.testimonial', ({ strapi }) => ({

    async post(ctx) {

        let { name, email, file, message } = ctx.request.body

        const testimonial = await strapi.db.connection.raw(`
            INSERT INTO testimonials (name, email, description) 
            VALUES ('${name}', '${email}', '${message}')
        `);

        if (file) {
            await strapi.db.connection.raw(`
                INSERT INTO files_related_morphs (file_id, related_id, related_type, field) 
                VALUES (${file}, ${testimonial[0].insertId}, 'api::testimonial.testimonial', 'file')
            `);
        }

        return { success: 1, message: "Your form has been submitted successfully" }
    }
}));