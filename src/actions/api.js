import firebase from '../config/firebase';
import { Permissions, Notifications } from 'expo';
const databaseRef = firebase.database().ref();
const userRef = databaseRef.child('users/');
const systemRef = databaseRef.child('system/')

//############################################### Quset ###############################################
// fetch questList System data
export const fetchSystem =(type)=>{
    return new Promise((resolve,reject)=>{
        systemRef.on('value',snap=>{
            if(type=="questList") {
                return resolve(snap.val().questList); }
            else if(type=="achieve") {return resolve(snap.val().achieve);}
            else return reject("wrong Type") 
        })
    })
}

// Add Quest to UserData
export const updateUserQuest = (quest, uid) => {
    const personalRef = userRef.child(uid);
    personalRef.child("quest/undone/").update({
        ...quest
    });
}

// update Quest in Userdata
export const updateScore = (uid,key,point) => {
    return new Promise(async (resolve, reject) => {
    const qusetUserRef = await userRef.child(uid+"/quest/undone/"+key);
     qusetUserRef.once("value", snap => {
        if(snap.exists()){
            const newScore = snap.val().current + point
            qusetUserRef.update({current:newScore});
            let result =snap.val();
            result['current']=newScore;
                return resolve({key:key,...result});
            }
        else {
            console.log("Error");
            return reject("Fail");
        }
    });
});
}

//Move undone to done
export const moveToDone=(uid,key,quest)=>{
    return new Promise(async(resolve,reject)=>{
        const personalRef = await userRef.child(uid)
        const userQuestRef = await personalRef.child("quest");
        const levelUserRef = await personalRef.child('levelQ/'+quest.type);
        var now = new Date();
        userQuestRef.child('undone/'+key).remove();
        userQuestRef.child('done/' + quest.type).update({
            [key]: { ...quest,
                time:now
            }
        });
        personalRef.child('star').transaction((star)=>{
            return (star||0) + quest.star
        })
        levelUserRef.once('value', snap => {
            const result = updateLevel(snap.val(), quest.star);
            levelUserRef.update(result);
            return resolve(result)
        });
    });   
}
// UpdateAchieve & check Achieve
export const updateAchieve=(uid,quest,achieve)=>{
        const personalRef = userRef.child(uid)
        var listResult = {};
        systemRef.once('value',snap=>{
                const achE = Object.entries(snap.val().achieve)
                const result = achE.filter((ach) => {
                const condition = ach[1].condition;
                const keyCon = Object.keys(condition);
                const filterCon = keyCon.filter((key)=>{
                        if (Array.isArray(condition[key])) { // เจาะจงเควส
                            //TODO เจาะจง
                            const test = condition[key];
                            const have = quest[key];
                            if (have == null) {
                                const result = [];
                            } else {
                                const result = have.filter((obj) => {
                                    console.log(obj)
                                    return Object.values(test).includes(Number(obj));
                                }).sort().join()
                            }
                            return result == test.sort().join();
                            }
                        else{   
                            // จำนวนเควส type มากกว่าหรือเท่ากับ condition
                            if (quest[key]!=null) {
                                return quest[key].length >= condition[key];
                            }
                            else{
                                return false
                            }
                        }
                   })
                if (filterCon.sort().join() == keyCon.sort().join()){
                    return true;
                }
                else{
                    return false;
                }
                }) 

               const filterResult = result.filter((obj)=>{
                if(achieve!=null){
                   if (Object.keys(achieve).length!=0){
                        return !Object.keys(achieve).includes(obj[0])
                   }
                }
                       return true
               });
               //Update in DataUser
               var now = new Date();
               var sumStar=0;
               //!Filter ไม่ได้เลยย
               if(filterResult!=[]){
                    filterResult.map((obj) => {
                        sumStar += Number(obj[1].star);
                        listResult = {
                            [obj[0]]: {
                                ...obj[1],
                                time: now,
                            },
                            ...listResult
                        };
                    });
                     personalRef.child('achieve').update(listResult);
               }
        personalRef.child('star').transaction((star) => {
            return (star || 0) + sumStar
        })
            });
            return listResult       //? ควรเก็บเวลาที่ทำสำเร็จไหม??
    } 

            //  updateLevel &Check Levelup
     const updateLevel=(data,star)=>{
    var currentStar = data.star+star;
    var level = data.level;
    const lvlup = Math.floor(currentStar / data.target);
    var target = data.target;
    if (currentStar >= data.target) {
        systemRef.once('value', snap => {
            currentStar =currentStar-data.target;
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

//

//############################################### Ranking ###############################################

//fetch Ranking
export const rankingUser=()=>{
        return new Promise((resolve, reject) => {
            userRef.orderByChild("score").once('value', snapshot => {
                let data =[];
                snapshot.forEach((item)=>{
                   data.push({name:item.val().displayName,
                             score: item.val().score,
                             uid:item.key
                });
                });
                return resolve(data.sort((a, b) => {
                return b.score - a.score;
            }));
            });
        });
}



//############################################### Authentication ###############################################

//Update Database when Login
export const updateDataUser=(uid,user)=>{
    return new Promise((resolve,reject)=>{
        const personalRef = userRef.child(uid);
        personalRef.on("value",snap=>{
            if(snap.val()!=null){
                if (snap.val().star == null || snap.val().levelQ == null) { //FirstTime Login
                    console.log("first time login")
                    initializeLevel = {
                        level: 1,
                        star: 0,
                        target: 10
                    }
                    personalRef.update({ 
                        ...user,
                        star: 0,
                        levelQ: {
                            food: initializeLevel,
                            rest: initializeLevel,
                            walk: initializeLevel,
                        }
                    })
                }
            }
            else{ personalRef.update({ ...user 
            })
            }
                return resolve(snap.val());
            });
    });
}

export const updateToken=async (uid)=>{
let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();



  userID = firebase.auth().currentUser.uid;

  userRef.child(uid).update({ pushToken: token });
  return token;
}




//############################################### Common Data User ###############################################
//ดึงข้อมูล จากDataตามUserนั้นๆ
export default (uid, path) => {
    return new Promise((resolve, reject) => {
        const personalRef = userRef.child(uid + "/" + path);
        const result = personalRef.on("value", snapshot => {
            if (snapshot.exists()) {
                return resolve(snapshot.val());
            }
        });
        return reject("Fail");
    });
}