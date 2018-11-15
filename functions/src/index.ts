import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Expo from "expo-server-sdk";

admin.initializeApp();
// Create a new Expo SDK client
let expo = new Expo();

exports.pushNotifications = functions.https.onRequest((req,res) => {
  if(req.method !== 'GET'){
    return res.status(403).send('Forbidden!')
  }

  let allTokens = [];
  let messages = [];

  admin.database().ref('/users/').once('value', (snapshot) => {
      let pushToken = snapshot.val().pushToken;
      if (Expo.isExpoPushToken(pushToken)){
          allTokens.push(pushToken)
    } else {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return null
    }
  })
  .then(() => {
    for (var token in allTokens){
      messages.push({
        to: token,
        sound: 'default',
        title: 'NXET',
        body: ' NEW ACTIVITIES ADDED!'
      })
    }
  })
  .then(() => {
    let chunks = expo.chunkPushNotifications(messages)

    async (chunks) => {
      for (let chunk of chunks) {
        try {
          await expo.sendPushNotificationsAsync(chunk);
        } catch (error){
          console.error(error);
        }
      }
    }

    return res.status(200).send('SUCCESS - NOTIFICATIONS SENT!!')

  })
  .catch(() => {
    return res.status(403).send('Forbidden!')
  });

  return res.status(200).send('Function Executing')

})