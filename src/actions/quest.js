import {fetchData,fetchQuestList} from './index';
import loadUserData,{fetchSystem,updateUserQuest,updateScore,moveToDone} from './api';
import {navigate} from './index'

const checkComplete = (uid,key,quest) => {
    console.log(quest.current + "/" + quest.target);
      if (quest.current >= quest.target) {
        //TODO นำเควสนี้ ย้ายไปยัง done
        moveToDone(uid,key,quest);
        //TODO เพิ่ม  Star
        //TODO เช็ค Achieve
        return true;
      }
      else{return false;} 
}

// Update Quest while During Quest
export const updateQuest=(uid,key,point)=>{
     return fetchData(updateScore(uid,key,point).then((quest)=>{
          if (checkComplete(uid,key,quest)) {
            return {isComplete:true}
          }
          else {
            return quest
          }
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
                const keyQuestUser = Object.entries(user.quest).filter((type) => type[0] == keyType);
                console.log("have"+keyQuestUser)
                const filteredKeysQuest = keysQuest.filter(quest =>{
                  const questlist = keyQuestUser[0];
                  console.log(questlist[1])
                  console.log(quest)
                  console.log(!questlist[1].includes(quest))
                 return !questlist[1].includes(quest)
                });
                console.log(filteredKeysQuest)

                var selectKeyQuest = filteredKeysQuest[filteredKeysQuest.length * Math.random() << 0];
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