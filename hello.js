const fetch = require("node-fetch");

fetch("https://exp.host/--/api/v2/push/send", {
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