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
const fetch = require('node-fetch');
//require("babel-polyfill");
admin.initializeApp();
// Create a new Expo SDK client
//https://us-central1-project3f-4a950.cloudfunctions.net/resetMidnight
exports.resetMidnight = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const allUserRef = yield admin.database().ref('/users');
    let message = [];
    let usersKey = [];
    const test = yield allUserRef.once("value", (usersSnap) => {
        usersSnap.forEach((user) => {
            let key = user.key;
            usersKey.push(key);
            if (user.val().pushToken != null) {
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
                    let questWalk = {};
                    unSnap.forEach(childSnap => {
                        if (childSnap.val().type === "walk") {
                            questWalk = {
                                [childSnap.key]: childSnap.val()
                            };
                        }
                        return childSnap.val().type !== "walk";
                    });
                    personalQuestRef.child("over").set(Object.assign({}, questWalk))
                        .catch(e => res.send(e));
                })
                    .then(() => { personalQuestRef.child("undone").remove().catch((e) => res.send(e)); })
                    .catch(e => res.send(e));
            }
            return false;
        });
    });
    const response = yield fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    });
    res.send("Status: " + response + "Remove Undone in userkey: " + usersKey);
}));
/*   notifications.push(); */ 
//# sourceMappingURL=index.js.map