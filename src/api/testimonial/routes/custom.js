module.exports = {
    routes: [
        {
            method: "POST",
            path: "/testimonial",
            handler: "testimonial.post",
            config: {
                auth: false,
            },
        },
    ]
}