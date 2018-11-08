import firebase from '../config/firebase';
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
        userQuestRef.child('undone/'+key).remove();
        userQuestRef.child('done/'+quest.type).update({[key]:quest});
        personalRef.once('value',snap=>personalRef.update({
            star:snap.val().star+quest.star,           
        }));
        //TODO อัพเวล
        levelUserRef.once('value', snap => {
            const result = updateLevel(snap.val(), quest.star);
            levelUserRef.update(result);
            return resolve(result)
        });
        
    });   
}
//  updateLevel &Check Levelup
//! บัค แม่งเด้งเรื่อยๆเลย
export const updateLevel=(data,star)=>{
    console.log(Object.values(data) + "/" + star)
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

//############################################### Ranking ###############################################

//fetch Ranking
export const rankingUser=()=>{
        return new Promise((resolve, reject) => {
            userRef.on('value',snapshot=>{
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
            if(snap.val().quest==null){
                console.log("first time login")
                 personalRef.update({ ...user,score:0,star:0,quest:{done:{none:"none"},undone:{none:"none"}} })
            }
            else{ personalRef.update({ ...user })
            }
                return resolve(snap.val());
            });
    });
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