'use strict';

/**
 * become-a-teacher service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::become-a-teacher.become-a-teacher');
