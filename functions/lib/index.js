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
/* import Expo from "expo-server-sdk";
 */
admin.initializeApp();
/* // Create a new Expo SDK client
let expo = new Expo(); */
//TODO MOVE UNDONE TO UNSUCCESS
exports.addMessage = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const allUserRef = yield admin.database().ref('/users');
    let usersKey = [];
    const test = yield allUserRef.on("value", (usersSnap) => {
        usersSnap.forEach((user) => {
            let key = user.key;
            usersKey.push(key);
            const personalQuestRef = allUserRef.child(key).child("/quest");
            if (user.child(key + "/quest/undone").exists) {
                personalQuestRef.child("undone").remove().catch((e) => res.send(e));
            }
            return false;
        });
    });
    res.send("Remove Undone in userkey: " + usersKey);
}));
exports.addTest = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const contacts = yield admin.database().ref('/contacts');
    let time = new Date().getTime();
    contacts.push(time);
}));
//# sourceMappingURL=index.js.map