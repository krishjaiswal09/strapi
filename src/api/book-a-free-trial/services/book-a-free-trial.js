'use strict';

/**
 * book-a-free-trial service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-a-free-trial.book-a-free-trial');
