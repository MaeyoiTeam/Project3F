import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
/* import Expo from "expo-server-sdk";
 */
admin.initializeApp();
/* // Create a new Expo SDK client
let expo = new Expo(); */
 
//https://us-central1-project3f-4a950.cloudfunctions.net/resetMidnight
exports.resetMidnight = functions.https.onRequest(async (req, res) => {
  const allUserRef = await admin.database().ref('/users');
  let usersKey = [];
  const test = await allUserRef.once("value", (usersSnap) => {
    usersSnap.forEach((user) => {
      let key = user.key;
      usersKey.push(key);
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
  res.send("Remove Undone in userkey: " + usersKey);
});
