'use strict';

/**
 * home-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-page.home-page', ({ strapi }) => ({

    async getStaticData(ctx) {

        let type = ctx.params.type

        const [rawResult] = await strapi.db.connection.raw(`SELECT slug from ${type}`)

        return { success: 1, message: "data found", data: rawResult }
    },

    async getStaticPodcast() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT c.slug AS slug, b.slug AS type FROM podcasts_categories_links cl JOIN categories c ON c.id = cl.category_id JOIN podcasts b ON cl.podcast_id = b.id WHERE b.published_at IS NOT NULL;`)

        return { success: 1, message: "data found", data: rawResult }
    },


    async getStaticBlog() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT c.slug AS slug, b.slug AS type FROM blogs_categories_links cl JOIN categories c ON c.id = cl.category_id JOIN blogs b ON cl.blog_id = b.id WHERE b.published_at IS NOT NULL;`)

        return { success: 1, message: "data found", data: rawResult }
    },


    async getStaticCourseCategory() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT slug from categories where id IN(SELECT course_id from courses_category_links) `)

        return { success: 1, message: "data found", data: rawResult }
    },

    async getStaticCourses() {

        const [rawResult] = await strapi.db.connection.raw(`SELECT c.slug AS slug, cr.slug AS type FROM categories c JOIN courses_category_links cl ON c.id = cl.category_id JOIN courses cr ON cl.course_id = cr.id;`)

        return { success: 1, message: "data found", data: rawResult }
    },

    async getData() {

        let data = {}

        data['banner'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { file: { fields: ["url"] }, 'banner': { populate: { image: { fields: ["url"] } } } },
        })

        data['images'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'images': { populate: { image: { fields: ["url"] } } } },
        })

        data['legend_section'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'legend_section': { populate: { fields: ['description', 'title'] } }, 'images': { populate: { image: { fields: ["url"] } } } },
        })

        data['what_legend_says'] = await strapi.db.query('api::what-legend-say.what-legend-say').findMany({
            where: { home: true },
            populate: { image: { fields: ["url"] }, video: { fields: ["url"] } },
            limit: 3,
        })

        data['how_it_work'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'how_it_work': { populate: { image: { fields: ["url"] } } } },
        })

        data['join_gharana_section'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'join_gharana_section': { populate: { image: { fields: ["url"] } } } },
        })

        // data['offering'] = await strapi.db.query('api::offer.offer').findMany({
        //     where: { home: true },
        //     populate: {image: { fields: ["url"] }},
        //     limit: 5
        // })

        data['you_have_been_waiting_for'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: ['you_have_been_waiting_for'],
        })

        data['you_have_been_waiting_for_image'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'you_have_been_waiting_for_image': { populate: { image: { fields: ["url"] } } } },
        })

        data['gurus_section'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'gurus_section': { populate: { image: { fields: ["url"] } } } },
        })

        data['gurus'] = await strapi.db.query('api::gallary.gallary').findMany({
            where: { home: true },
            select: ['name', 'title', 'short_description'],
            populate: { image: { fields: ["url"] }, video: { fields: ["url"] } },
            limit: 5
        })

        // data['reviews'] = await strapi.db.query('api::review.review').findMany({
        //     populate: {image: { fields: ["url"] }},
        //     where: { published_at: { '$notNull': true} },
        //     limit: 20
        // })

        data['stars'] = await strapi.db.query('api::star.star').findMany({
            where: { home: true },
            populate: { image: { fields: ["url"] }, video: { fields: ["url"] } },
            limit: 13
        })

        data['SEO'] = await strapi.db.query('api::home-page.home-page').findOne({
            populate: { 'SEO': { populate: { image: { fields: ["url"] } } } },
        })

        data['slider'] = await strapi.db.query('api::home-page.home-page').findOne({
            populate: { 'slider': { populate: { image: { fields: ["url"] } } } },
        })

        data['becom_a_teacher_section'] = await strapi.db.query('api::home-page.home-page').findMany({
            populate: { 'becom_a_teacher_section': { populate: { image: { fields: ["url"] }, fields: ['description', 'title'] } } },
        })

        data["reviews"] = await strapi.db.query("api::testimonial.testimonial").findMany({
            where: { type: 'home' },
            populate: { image: { fields: ["url"] } }
        })

        data['courses'] = await strapi.db.query('api::course.course').findMany({
            where: {
                home: true, $and: [
                    { category: { $not: null } } // Ensures category is not null
                ]
            },
            populate: { image: { fields: ["url"] }, category: '*' },
            limit: 5
        })

        data['featured_courses'] = await strapi.db.query('api::course.course').findMany({
            where: {
                is_featured: true, $and: [
                    { category: { $not: null } } // Ensures category is not null
                ]
            },
            populate: { image: { fields: ["url"] }, category: '*' },
            limit: 4
        }) 

        return { success: 1, message: "data found", data: data }
    }
}));
