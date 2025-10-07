'use strict';

/**
 * plan-pricing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plan-pricing.plan-pricing');
