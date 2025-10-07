module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/get-static-path-faq-categories',
            handler: 'faq-category.getStaticData',
            config: {
                auth: false
            }
        }
    ]
}
