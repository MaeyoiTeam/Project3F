import firebase from '../config/firebase';
const databaseRef = firebase.database().ref();
const userRef = databaseRef.child('users/');
const systemRef = databaseRef.child('system/')


// fetch System data
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

//update User data quest
export const updateUserQuest=(quest,uid)=>{
    const personalRef = userRef.child(uid);
        personalRef.child("quest/undone/").update({
            ...quest
        });
}

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

// update QuestUser data
//!  Bug เวลาเปลี่ยนเควส แล้วPoint เด้ง
export const updateScore = (uid,key,point) => {
    return new Promise((resolve, reject) => {
    const qusetUserRef = userRef.child(uid+"/quest/undone/"+key);
     qusetUserRef.once("value", snap => {
        if(snap.exists()){
            const newScore = snap.val().current + point
            
            qusetUserRef.update({current:newScore});
            let result =snap.val();
            result['current']=newScore;
            console.log(result)
                return resolve({key:key,quest:result});
            }
        else {
            console.log("Error");
            return reject("Fail");
        }
    });
});
}

//Update Database when Login
export const updateDataUser=(uid,user)=>{
    return new Promise((resolve,reject)=>{
        const personalRef = userRef.child(uid);
        personalRef.update({ ...user }).then(()=>{
            personalRef.on("value",snap=>{
                return resolve(snap.val());
            });
        });
    });
   
}

//ดึงข้อมูล จากDataตามUserนั้นๆ
export default (data,path)=>{
    return new Promise((resolve,reject)=>{
        const personalRef = userRef.child(data.uid+"/"+path);
        const result = personalRef.on("value", snapshot => {
            if(snapshot.exists()){
            return resolve(snapshot.val());
        }
    });
    return reject("Fail");
});
}