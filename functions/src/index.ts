import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
const fetch = require('node-fetch');
//require("babel-polyfill");
admin.initializeApp();
 // Create a new Expo SDK client
 
//https://us-central1-project3f-4a950.cloudfunctions.net/resetMidnight
exports.resetMidnight = functions.https.onRequest(async (req, res) => {
  const allUserRef = await admin.database().ref('/users');
  let message = [];
  let usersKey = [];
  const test = await allUserRef.once("value", (usersSnap) => {
    usersSnap.forEach((user) => {
      let key = user.key;
      usersKey.push(key);
      if (user.val().pushToken!=null){
        message.push({
          to: user.val().pushToken,
          sound: "default",
          title: "Daily Quest has been clear!!",
          body: "Visit our app for next challage",
          data: { status: "ok" }
        });
      }
      const personalQuestRef = allUserRef.child(key).child("/quest");
      if (user.child(key + "/quest/undone").exists) {
        personalQuestRef.child("undone").once("value", unSnap => {
          let questWalk={};
          unSnap.forEach(childSnap=>{
            if (childSnap.val().type === "walk"){
              questWalk={
                [childSnap.key]:childSnap.val()
              }
            }
            return childSnap.val().type!=="walk"
          })
          personalQuestRef.child("over").set({...questWalk})
              .catch(e => res.send(e));
          })
          .then(() => {personalQuestRef.child("undone").remove().catch((e) => res.send(e))})
          .catch(e => res.send(e));
      }
      return false;
    })
  })
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  });
  res.send("Status: "+response+"Remove Undone in userkey: " + usersKey);
});




/*   notifications.push(); */