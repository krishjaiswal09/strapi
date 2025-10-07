module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/get-static-path-podcasts',
            handler: 'podcast.getStaticData',
            config: {
                auth: false
            }
        }
    ]
}