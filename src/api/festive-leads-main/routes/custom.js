module.exports = {
    routes: [
        {
            method: "POST",
            path: "/festive-lead-main",
            handler: "festive-leads-main.post",
            config: {
                auth: false,
            },
        }
    ],
};
