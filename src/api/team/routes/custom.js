module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/get-static-path-teams',
            handler: 'team.getStaticData',
            config: {
                auth: false
            }
        }
    ]
}