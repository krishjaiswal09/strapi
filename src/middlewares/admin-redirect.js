module.exports = (_config, { strapi }) => {
    const redirects = ['/', '/index.html'].map((path) => ({
        method: 'GET',
        path,
        handler: (ctx) => ctx.redirect('/admin-panel'),
        config: { auth: false },
    }));

    strapi.server.routes(redirects);
};