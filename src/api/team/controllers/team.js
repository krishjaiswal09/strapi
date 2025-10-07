'use strict';

/**
 * team controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::team.team', ({ strapi }) => ({

    async getStaticData() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT slug from teams`)

        return { success: 1, message: "data found", data: rawResult }
    },
}));
