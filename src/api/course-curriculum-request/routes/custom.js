module.exports = {
    routes: [
        {
            method: "POST",
            path: "/course-curriculum-request",
            handler: "course-curriculum-request.post",
            config: {
                auth: false,
            },
        }
    ]
}