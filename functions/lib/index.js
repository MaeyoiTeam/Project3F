const functions = require("firebase-functions");
const fetch = require("node-fetch");
/* exports.sendPushNotification = functions.database.ref("contacts/{id}").onCreate((snap, context) => {
         return fetch("https://exp.host/--/api/v2/push/send", {
            body: JSON.stringify({
                to: "ExponentPushToken[BYh79LF4M-w7UrLLi31BRO]",
                title: "Title notification",
                body: "Test1!",
                data: {
                message: "kuy"
                }
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
            });
}); */
exports.testNoti = function helloWorld(req, res) {
    return fetch("https://exp.host/--/api/v2/push/send", {
        body: JSON.stringify({
            to: "ExponentPushToken[BYh79LF4M-w7UrLLi31BRO]",
            title: "Title notification",
            body: "Test1!",
            data: {
                message: "kuy"
            }
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
};
//# sourceMappingURL=index.js.map