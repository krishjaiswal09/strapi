module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/get-category-course',
            handler: 'course.categoryAndCourses',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/get-static-path-courses',
            handler: 'course.getStaticData',
            config: {
                auth: false
            }
        }
    ]
}