module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/home',
            handler: 'home-page.getData',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/get-static-path/:type',
            handler: 'home-page.getStaticData',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/get-static-podcast',
            handler: 'home-page.getStaticPodcast',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/get-static-course-category',
            handler: 'home-page.getStaticCourseCategory',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/get-static-course',
            handler: 'home-page.getStaticCourses',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/get-static-blog',
            handler: 'home-page.getStaticBlog',
            config: {
                auth: false
            }
        }
    ]
}
