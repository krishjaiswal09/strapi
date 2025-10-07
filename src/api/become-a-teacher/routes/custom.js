module.exports = {
    routes: [
        {
            method: "POST",
            path: "/become-a-teacher",
            handler: "become-a-teacher.post",
            config: {
                auth: false,
            },
        },
    ]
}