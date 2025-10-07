'use strict';

/**
 * faq-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::faq-category.faq-category', ({ strapi }) => ({

    async getStaticData() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT slug from faq_categories`)

        return { success: 1, message: "data found", data: rawResult }
    },
}));
