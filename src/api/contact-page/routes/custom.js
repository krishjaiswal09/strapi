module.exports = {
    routes: [
        {
            method: "POST",
            path: "/contact-us",
            handler: "contact-page.post",
            config: {
                auth: false,
            },
        },
    ],
};
