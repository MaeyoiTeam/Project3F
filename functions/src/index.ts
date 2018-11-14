const functions = require("firebase-functions");
let fetch = require("node-fetch");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref("contacts/{id}").onCreate((snap, context)=> {
  const root = snap.ref.root;
    let messages:any = [];

    //return the main promise
    return root
      .child("/users")
      .once("value", (function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const pushToken: any = childSnapshot.val().pushToken;
          console.log(pushToken)
          if (pushToken) {
            messages.push({
              to: pushToken,
              body: "New Note Added"
            });
          }
        });
        return Promise.all(messages);
      })
      )
      .then(message => {
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "accept-encoding": "gzip , deflate",
            "content-type": "application/json"
          },
          body: JSON.stringify(message)
        });
      });
  });
