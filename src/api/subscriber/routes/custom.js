module.exports = {
    routes: [
        {
            method: "POST",
            path: "/subscribe",
            handler: "subscriber.post",
            config: {
                auth: false,
            },
        },
    ],
};
