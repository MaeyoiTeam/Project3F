import {fetchData,fetchQuestList} from './index';
import loadUserData,{fetchSystem,updateUserQuest,updateScore} from './api';
import {navigate} from './index'

const checkComplete =(current,target)=>{
    console.log(current + "/" + target)
      if (current >= target) {
        //TODO นำเควสนี้ ย้ายไปยัง done
        //TODO เพิ่ม  Star
        //TODO เช็ค Achieve
        console.log("Sucess")
      } 
}

// Update Quest while During Quest
export const updateQuest=(uid,key,point)=>{
     return fetchData(updateScore(uid,key,point).then((obj)=>{
          checkComplete(obj.current,obj.target);
          return obj 
      }));

}
// Fetch during Quest Firsttime 
export const fetchQuest = (uid,key) => {
  const path = "quest/undone/"+key;
  const result = loadUserData(uid,path).then((obj)=>{

    return {key:key,...obj}
  });
    return fetchData(result);
}

// Get during Quest List form userData 
export const getQuestList = (uid) => {
  const result = loadUserData(uid, "quest").then((obj)=>{
    return Object.entries(obj.undone)});
   return fetchQuestList(result);
}

//Random Quest from system
export const randomQuest= (user)=>{
  return async (dispatch) => {
        //? อยากทำให้ เลเวลTypeเยอะ ยิ่้งรับเควสได้เยอะ 
          const result = await fetchSystem("questList").then((data)=>{
        //* *สุ่มเควสจากแต่ละtype 1อัน

              var keysType = Object.keys(data)
              var slectQuests = {};
              keysType.map((keyType,i)=>{
                const quest = data[keyType];
                var keysQuest = Object.keys(data[keyType])
                //TODO เควสที่สุ่มต้องไม่มีในUserนั้น ดูใน userData
                console.log(keysQuest)
                console.log(user.quest)
                var selectKeyQuest = keysQuest[keysQuest.length * Math.random() << 0];
                const source =quest[selectKeyQuest]
                slectQuests = {
                    [selectKeyQuest]: {
                      type: keyType,
                      current: 0,
                      ...source
                    },
                    ...slectQuests
                };
              })
              updateUserQuest(slectQuests, user.uid)
              return slectQuests;
          })
          return fetchData(result);
  }
}