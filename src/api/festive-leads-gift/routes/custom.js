module.exports = {
    routes: [
        {
            method: "POST",
            path: "/festive-lead-gift",
            handler: "festive-leads-gift.post",
            config: {
                auth: false,
            },
        }
    ],
};
