module.exports = {
    routes: [
        {
            method: "POST",
            path: "/book-free-trial",
            handler: "book-a-free-trial.post",
            config: {
                auth: false,
            },
        }
    ],
};
