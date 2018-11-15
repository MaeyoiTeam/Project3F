"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const expo_server_sdk_1 = require("expo-server-sdk");
admin.initializeApp();
// Create a new Expo SDK client
let expo = new expo_server_sdk_1.default();
exports.pushNotifications = functions.https.onRequest((req, res) => {
    if (req.method !== 'GET') {
        return res.status(403).send('Forbidden!');
    }
    let allTokens = [];
    let messages = [];
    admin.database().ref('/users/').once('value', (snapshot) => {
        let pushToken = snapshot.val().pushToken;
        if (expo_server_sdk_1.default.isExpoPushToken(pushToken)) {
            allTokens.push(pushToken);
        }
        else {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            return null;
        }
    })
        .then(() => {
        for (var token in allTokens) {
            messages.push({
                to: token,
                sound: 'default',
                title: 'NXET',
                body: ' NEW ACTIVITIES ADDED!'
            });
        }
    })
        .then(() => {
        let chunks = expo.chunkPushNotifications(messages);
        (chunks) => __awaiter(this, void 0, void 0, function* () {
            for (let chunk of chunks) {
                try {
                    yield expo.sendPushNotificationsAsync(chunk);
                }
                catch (error) {
                    console.error(error);
                }
            }
        });
        return res.status(200).send('SUCCESS - NOTIFICATIONS SENT!!');
    })
        .catch(() => {
        return res.status(403).send('Forbidden!');
    });
    return res.status(200).send('Function Executing');
});
//# sourceMappingURL=index.js.map