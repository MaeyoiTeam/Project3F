import {fetchData,fetchQuestList,fetchHistoryList} from './index';
import loadUserData,{fetchSystem,updateUserQuest,updateScore,moveToDone,updateAchieve} from './api';
import {FETCH_USER_FAIL,FETCH_USER_SUCCESS,FETCH_USER} from '../constants';
import {navigate} from './index'
import { resolve } from 'url';
//Update Middleware 

export const updateQuestDone = (user,key,type)=>{
  var quest =user.quest;
  var quest = quest[type];
  if (Array.isArray(quest)) {
      quest.push(key);
  }
  else{
    quest = [key];
  }
  quest = { [type]:quest,
              ...user.quest
            }
  //TODO update Achievement
 const newAchieve = updateAchieve(user.uid,quest,user.achieve);
 var achievement = user.achieve;
  if (achievement!=null) {
     achievement={...newAchieve,...achievement}
  } else {
    achievement = {...newAchieve};
  }
    return (dispatch)=>{
        dispatch({
          type:FETCH_USER_SUCCESS,
          payload:{ ...user,
            quest:quest,
            achieve:achievement
          }
        });
    }
} 

// Update Quest while During Quest
export const updateQuest=(user,key,point)=>{
    const result = updateScore(user.uid, key, point).then((quest) => {
      if (quest.current >= quest.target) {
         return moveToDone(user.uid, key, quest).then((obj) => {
          return { ...obj,
            isComplete: true
          }
        }) 
      } else {
        return quest
      }
    });
     return fetchData(result);
}

// Fetch during Quest Firsttime 
export const fetchQuest = (uid,key,type) => {
  const path = "quest/"+type+"/"+key;
  const result = loadUserData(uid,path).then((obj)=>{
    return {key:key,...obj}
  });

    return fetchData(result);
}

// Get during Quest List form userData 
export const getQuestList = (uid,type) => {
  const result = loadUserData(uid, "quest").then((obj)=>{
  switch (type) {
    case "undone": return Object.entries(obj.undone)
    case "done": return Object.entries(obj.done)
    default: return null
  }
  });
    switch (type) {
    case "undone": return fetchQuestList(result);
    case "done": return fetchHistoryList(result);
    default: return null
  }
}

//Random Quest from system
export const randomQuest= (user)=>{
  return async (dispatch) => {
        //? อยากทำให้ เลเวลTypeเยอะ ยิ่้งรับเควสได้เยอะ 
          const result = await fetchSystem("questList").then((data)=>{
        //* *สุ่มเควสจากแต่ละtype 1อัน

              var keysType = Object.keys(data)
              var slectQuests = {};
//            keysType.map((keyType,i)=>{
              const keyType="food"; 
                const quest = data[keyType];
                var keysQuest = Object.keys(data[keyType])
                //TODO แบ่งระดับความยากง่าย
                if(Object.keys(user.quest).includes(keyType)){
                    const keyQuestUser = Object.entries(user.quest).filter(type => type[0] == keyType);
                    keysQuest = keysQuest.filter(quest => {
                      const questlist = keyQuestUser[0];
                      return !questlist[1].includes(quest);
                    });
                }
                var selectKeyQuest = keysQuest[keysQuest.length * Math.random() << 0];
                const source =quest[selectKeyQuest]
                if(selectKeyQuest!=null){
                  slectQuests = {
                    [selectKeyQuest]: {
                      type: keyType,
                      current: 0,
                      ...source
                    },
                    ...slectQuests
                  };
                }
//  })
                //test Walk Quest
                date = new Date()
              slectQuests = {
                walk:{type:"walk",start:date.toISOString(),last:new Date(date.setHours(24,0,0,0)).toISOString()},
                ...slectQuests,
              }
              updateUserQuest(slectQuests, user.uid)
              return slectQuests;
          })
          return fetchData(result);
  }
}

//############################################### Quest Walk ###################################################

export const compareScore = (data, stepCount) => {
        let result = fetchSystem("walkScore").then((allScore)=>{
          const filterScore = Object.entries(allScore).filter((systemScore)=>{
            return stepCount >= systemScore[0]
          })
          return {
            stepCount: stepCount,
            targetSteps: filterScore,
            ...data
          }
        })
      return fetchData(result);
}