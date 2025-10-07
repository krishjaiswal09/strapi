'use strict';

/**
 * podcast controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::podcast.podcast', ({ strapi }) => ({

    async getStaticData() {

        const [podcastResult] = await strapi.db.connection.raw(`
            SELECT 
                c.name AS category, 
                c.slug AS category_slug,
                JSON_ARRAYAGG(JSON_OBJECT('title', p.title, 'slug', p.slug)) AS podcasts 
            FROM 
                podcasts p
            INNER JOIN 
                podcasts_categories_links pcl ON p.id = pcl.podcast_id
            INNER JOIN 
                categories c ON pcl.category_id = c.id
            WHERE 
                p.published_at IS NOT NULL
            GROUP BY 
                c.name, c.slug
        `);
        
        // Parse the raw result and format it
        const formattedPodcasts = podcastResult.map(row => ({
            name: row.category,
            slug: row.category_slug,
            podcasts: JSON.parse(row.podcasts) // Parse JSON string
        }));
        
        return {
            success: 1,
            message: "Podcasts found",
            data: formattedPodcasts
        };
        
    },
}));
