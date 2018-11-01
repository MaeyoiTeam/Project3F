import firebase from '../config/firebase';
const databaseRef = firebase.database().ref();
const userRef = databaseRef.child('users/');

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
//
export const updateScore = (uid,point) => {
    return new Promise((resolve, reject) => {
    const personalRef = userRef.child(uid);
    personalRef.child('score').once("value",snap=>{
        if(snap.exists){
            const newScore = snap.val()+point
            personalRef.update({
                score: newScore
            });
            
                return resolve(newScore);
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
    const personalRef = userRef.child(uid);
    personalRef.update({
        ...user
    });
}

//ดึงข้อมูล จากDataตามUserนั้นๆ
export default (data)=>{
    return new Promise((resolve,reject)=>{
        const personalRef = userRef.child(data.uid);
        personalRef.on("value", snapshot => {
            if(snapshot.exists()){
            var myJSON = JSON.stringify(snapshot.val());
            return resolve(snapshot.val());
        }
            else{
                return reject("Fail");
            }
    });
});
}