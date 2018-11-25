import firebase from '../config/firebase';
import {
    Permissions,
    Notifications
} from 'expo';
const databaseRef = firebase.database().ref();
const userRef = databaseRef.child('users/');
const systemRef = databaseRef.child('system/')



//############################################### System ###############################################

// fetch questList System data
export const fetchSystem = (type) => {
    return new Promise((resolve, reject) => {
        systemRef.on('value', snap => {
            switch (type) {
                case "questList":
                    resolve(snap.val().questList);
                    break;
                case "achieve":
                    resolve(snap.val().achieve);
                    break;
                case "walkScore":
                    resolve(snap.val().walkScore);
                    break;
                default:
                    reject("wrong Type")
                    break;
            }
        })
    })
}





//############################################### Quset ###############################################
// Add Quest to UserData
export const updateUserQuest = (quest, uid) => {
    const personalRef = userRef.child(uid);
    personalRef.child("quest/undone/").update({
        ...quest
    });
}

// update Quest in Userdata
export const updateScore = (uid, key, point) => {
    return new Promise(async (resolve, reject) => {
        const qusetUserRef = await userRef.child(uid + "/quest/undone/" + key);
        qusetUserRef.once("value", snap => {
            if (snap.exists()) {
                const newScore = point
                qusetUserRef.update({
                    current: newScore
                });
                let result = snap.val();
                result['current'] = newScore;
                return resolve({
                    key: key,
                    ...result
                });
            } else {
                console.log("Error");
                return reject("Fail");
            }
        });
    });
}

//Move undone to done
export const moveToDone = (uid, key, quest) => { //quest คือข้อมูลที่เอาไปลงในdone
    return new Promise(async (resolve, reject) => {
        const personalRef = await userRef.child(uid)
        const userQuestRef = await personalRef.child("quest");
        const levelUserRef = await personalRef.child('levelQ/' + quest.type);
        var now = new Date();
        if (quest.type == "food" || quest.type == "rest") {
            userQuestRef.child('undone/' + key).remove();
        }
        userQuestRef.child('done/' + quest.type).update({
            [key]: { ...quest,
                time: now
            }
        });
        personalRef.child('star').transaction((star) => {
            const sum = (Number(star) || 0) + Number(quest.star)
            return sum
        })
        levelUserRef.once('value', snap => {
            const result = updateLevel(snap.val(), quest.star);
            levelUserRef.update(result);
            return resolve(result)
        });
    });
}
// UpdateAchieve & check Achieve 
export const updateAchieve = (uid, quest) => {
    return new Promise((resolve,reject)=>{
        try{
            const personalRef = userRef.child(uid)
            var listResult = {};
            personalRef.child('achieve').once('value',(ownAchieveSnap)=>{
                systemRef.once("value", snap => {
                    const achE = Object.entries(snap.val().achieve);
                    const result = achE.filter(ach => {
                        const condition = ach[1].condition;
                        const keyCon = Object.keys(condition);
                        const filterCon = keyCon.filter(key => {
                            const require = condition[key];
                            if (Array.isArray(condition[key])) {
                                // เจาะจงเควส
                                //TODO เจาะจง

                                const have = quest[key]; // นี่คือเควส
                                if (have == null) {
                                    const result = [];
                                } else {
                                    const result = have
                                        .filter(obj => {
                                            return Object.values(require).includes(String(obj));
                                        })
                                        .sort()
                                        .join();
                                }
                                return result == require.sort().join();
                            } else if (typeof condition[key] == "object") {
                                //กรณีจำนวนwalk stacks
                                const haveWalkStacks = quest; //อันนี้คือwalkStacks
                                const result = Object.entries(haveWalkStacks).filter(
                                    obj => {
                                        return obj[1] >= require[obj[0]];
                                    }
                                );
                                return result.length == Object.keys(require).length;
                            } else {
                                // จำนวนเควส type มากกว่าหรือเท่ากับ condition
                                if (quest[key] != null) {
                                    return quest[key].length >= condition[key];
                                } else {
                                    return false;
                                }
                            }
                        });
                        if (filterCon
                            .sort()
                            .join() == keyCon.sort().join()) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    const filterResult = result.filter(obj => {
                        if (ownAchieveSnap.val() != null) {
                            if (Object.keys(ownAchieveSnap.val()).length != 0) {
                                return !Object.keys(ownAchieveSnap.val()).includes(obj[0]);
                          }
                        }
                        return true;
                    });
                    //Update in DataUser
                    var sumStar = 0;
                    if (filterResult != []) {
                        filterResult.map(obj => {
                            sumStar += Number(obj[1].star);
                            listResult = { [obj[0]]: { ...obj[1], time: new Date().toISOString() }, ...listResult };
                        });
                        personalRef.child("achieve").update(listResult);
                    }
                    personalRef.child("star").transaction(star => {
                        return (Number(star) || 0) + Number(sumStar);
                    });
                });
            })
            return resolve(listResult)
        }catch(e){
            return reject(e)
        }
    });
}


//  updateLevel &Check Levelup ตาม typeนั้นๆ
const updateLevel = (data, star) => {
    var currentStar = Number(data.star) + Number(star);
    var level = data.level;
    const lvlup = Math.floor(currentStar / data.target);
    var target = data.target;
    console.log(lvlup);
    if (lvlup>=1) {
        systemRef.once('value', snap => {
            currentStar = currentStar - data.target;
            level = level + lvlup
            target = snap.val().level[level]
        })
    }
    return {
        level: level,
        star: currentStar,
        target: target
    }
}

//############################################### QuestWalk #############################################
// Update Walk Stacks 
export const updateWalkStacks = (uid, walkStacks) => {
    return new Promise(async (resolve, reject) => {
        const personalRef = userRef.child(uid);
        const userWalkStacksRef = personalRef.child('walkStacks');
        await walkStacks.map(stack => {
            userWalkStacksRef.child(stack).transaction(score => {
                score++;
                return score
            })
        })
        userWalkStacksRef.once("value", snap => resolve(snap.val()));
    })
}
// เคลียร์ Over หลังทำคำนวณดาวทุกอย่างแล้ว
export const clearOver = (uid) => {
    return new Promise(async (resolve, reject) => {
        const personalRef = userRef.child(uid);
        const questUserRef = personalRef.child('quest');
        questUserRef.child('over').remove();
        resolve("success")
    })
}

//############################################### Ranking ###############################################

//fetch Ranking
export const rankingUser = (uid) => {
    return new Promise((resolve, reject) => {
        userRef.orderByChild("star").limitToLast(10).once('value', snapshot => {
            let data = [];
            snapshot.forEach((item) => {
                data.push({
                    name: item.val().displayName,
                    star: item.val().star,
                    uid: item.key,
                    photoURL: item.val().photoURL + "?width=256",
                });
            });
            return resolve(data.sort((a, b) => {
                return b.star - a.star;
            }));
        })
    });
}



//############################################### Authentication && Profile ###############################################

//Update Database when Login
export const updateDataUser = (uid, user) => {
    return new Promise((resolve, reject) => {
        const personalRef = userRef.child(uid);
        personalRef.on("value", snap => {
            if (snap.val() != null) {
                if (snap.val().star == null || snap.val().levelQ == null) { //FirstTime Login
                    console.log("first time login")
                    initializeLevel = {
                        level: 1,
                        star: 0,
                        target: 10
                    }
                    personalRef.update({
                        walkStacks:{999:0},
                        ...user,
                        isShowNotification: true,
                        star: 0,
                        notificationLog:{
                            0:{
                                title:"First time Login",
                                body:"Welcome to Achieve App",
                                date:new Date().toISOString(),
                            }
                        },
                        levelQ: {
                            food: initializeLevel,
                            rest: initializeLevel,
                            walk: initializeLevel,
                        }
                    })
                }
            } else {
                personalRef.update({ ...user
                })
            }
            return resolve(snap.val());
        });
    });
}

export const updateToken = async (uid) => {
    let {
        status
    } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    userRef.child(uid).update({
        pushToken: token
    });
    return token;
}

export const onOffNotification = (user, permission) => {
    return new Promise((resolve, reject) => {
        userRef.child(user.uid).update({
            isShowNotification: permission
        });
        return resolve({ ...user,
            isShowNotification: permission
        })
    })
}


//############################################### Common Data User ###############################################
//ดึงข้อมูล จากDataตามUserนั้นๆ
export default (uid, path = '') => {
    return new Promise((resolve, reject) => {
        const personalRef = userRef.child(uid + "/" + path);
        const result = personalRef.once("value", snapshot => {
            if (snapshot.exists()) {
                return resolve(snapshot.val());
            }
        }).catch((e) => reject(e))
    });
}


//############################################### Notification ###############################################

export const updateDataUserNotification = (uid, NotiLogs) => {
    return new Promise((resolve, reject) => {
        const personalRef = userRef.child(uid);
        const result = personalRef.child('notificationLog').update(NotiLogs)
        return resolve("Sucess");
    })
}