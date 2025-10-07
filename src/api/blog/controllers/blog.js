'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({

    async getStaticData() {

        const [blogResult] = await strapi.db.connection.raw(`
            SELECT 
                c.name AS category, 
                c.slug AS category_slug,
                JSON_ARRAYAGG(JSON_OBJECT('title', b.title, 'slug', b.slug)) AS blogs 
            FROM 
                blogs b
            INNER JOIN 
                blogs_categories_links cl ON b.id = cl.blog_id
            INNER JOIN 
                categories c ON cl.category_id = c.id
            WHERE 
                b.published_at IS NOT NULL
            GROUP BY 
                c.name, c.slug
        `);
        
        // Parse the raw result and format it
        const formattedBlogs = blogResult.map(row => ({
            name: row.category,
            slug: row.category_slug,
            blogs: JSON.parse(row.blogs) // Parse JSON string
        }));
        
        return {
            success: 1,
            message: "Blogs found",
            data: formattedBlogs
        };
        
    },
}));