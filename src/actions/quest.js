import {fetchData,fetchQuestList} from './index';
import loadUserData,{fetchSystem,updateUserQuest,updateScore,moveToDone} from './api';
import {FETCH_USER_FAIL,FETCH_USER_SUCCESS,FETCH_USER} from '../constants';
import {navigate} from './index'
import { resolve } from 'url';

export const updateQuestDone = (user,key,type)=>{
  console.log("work")
  var data =user.quest;
  var dataType = data[type];
  dataType.push(key);
   console.log()
    return (dispatch)=>{
        dispatch({
          type:FETCH_USER_SUCCESS,
          payload:{ ...user,
            quest:{ [type]:dataType,
              ...user.quest
            }
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
                if(Object.keys(user.quest).includes(keyType)){
                    const keyQuestUser = Object.entries(user.quest).filter(type => type[0] == keyType);
                    console.log("have : " + keyQuestUser);
                    keysQuest = keysQuest.filter(quest => {
                      const questlist = keyQuestUser[0];
                      console.log("list : " + questlist[1]);
                      console.log("with this : " + quest);
                      console.log("not have this " + !questlist[1].includes(quest));
                      return !questlist[1].includes(quest);
                    });
                }
                 
                console.log("filtered: " + keysQuest)
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
              })
              updateUserQuest(slectQuests, user.uid)
              return slectQuests;
          })
          return fetchData(result);
  }
}