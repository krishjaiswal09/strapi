module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/get-static-path-blogs',
            handler: 'blog.getStaticData',
            config: {
                auth: false
            }
        }
    ]
}