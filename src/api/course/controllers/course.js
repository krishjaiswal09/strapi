'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({ strapi }) => ({

    async getStaticData() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT slug from courses`)

        return { success: 1, message: "data found", data: rawResult }
    },

    async categoryAndCourses() {

        const [rawResult] = await strapi.db.connection.raw(`
            SELECT 
                c.mini_name AS category, 
                c.slug AS category_slug,
                JSON_ARRAYAGG(JSON_OBJECT('name', cr.name, 'slug', cr.slug)) AS courses 
            FROM 
                courses cr
            INNER JOIN 
                courses_category_links cl ON cr.id = cl.course_id
            INNER JOIN 
                categories c ON cl.category_id = c.id
            GROUP BY 
                c.name, c.slug
        `);
    
        // Parse the raw result and format it
        const formattedResult = rawResult.map(row => ({
            name: row.category,
            slug: row.category_slug,
            courses: JSON.parse(row.courses) // Parse JSON string
        }));
    
        return {
            success: 1,
            message: "Data found",
            data: formattedResult
        };
    }
}));
