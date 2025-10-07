module.exports = {
    routes: [
        {
            method: "POST",
            path: "/career",
            handler: "career.post",
            config: {
                auth: false,
            },
        },
    ],
};
