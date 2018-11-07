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
        const userQuestRef =await userRef.child(uid+"/quest/");
        userQuestRef.child('undone/'+key).remove();
        userQuestRef.child('done/'+quest.type).update({[key]:quest});
        return resolve('Success')
    });
    
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
                 personalRef.update({ ...user,score:0,quest:{done:{none:"none"},undone:{none:"none"}} })
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