import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
/* import Expo from "expo-server-sdk";
 */
admin.initializeApp();
/* // Create a new Expo SDK client
let expo = new Expo(); */
 
//TODO MOVE UNDONE TO UNSUCCESS
exports.resetMidnight = functions.https.onRequest(async (req, res) => {
    const allUserRef = await admin.database().ref('/users');
    let usersKey = [];
   const test = await allUserRef.once("value", (usersSnap) => {
    usersSnap.forEach((user) => {
      let key = user.key;
      usersKey.push(key);
      const personalQuestRef = allUserRef.child(key).child("/quest"); 
      if (user.child(key+"/quest/undone").exists){
        personalQuestRef.child("undone").remove().catch((e) => res.send(e))
      }
      return false;
    })
  })
  res.send("Remove Undone in userkey: "+usersKey);
});
/* 
exports.addTest = functions.https.onRequest(async (req, res) => {
  const contacts = await admin.database().ref('/contacts');
  let time = new Date().getTime();
  contacts.push(time);
}); */