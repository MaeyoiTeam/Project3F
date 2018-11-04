import {fetchData,fetchQuestList} from './index';
import loadUserData,{fetchSystem,updateUserQuest,updateScore} from './api';

export const updateQuest=(uid,key,point)=>{
 return fetchData(updateScore(uid,key,point));
}
export const fetchQuest = (uid,key) => {
  const path = "quest/undone/"+key;
  const result = loadUserData(uid,path).then((obj)=>{
    return {key:key,...obj}
  });
    return fetchData(result);
}


export const getQuestList = (uid) => {
  const result = loadUserData(uid, "quest").then((obj)=>{
    return Object.values(obj)});
   return fetchQuestList(result);
}


export const randomQuest=(uid)=>{
//? จะเอาข้อมูลUserQuest จาก รับมาจากfunction หรือเอาUIDไปหาใหม่อีกทีดี  
  const result = fetchSystem("questList").then((data)=>{
//* *สุ่มเควสจากแต่ละtype 1อัน
//TODO เควสที่สุ่มต้องไม่มีในUserนั้น
      var key = Object.keys(data)
      var obj = Object.values(data)
       var selectQ = {}; 
      obj.map((elem,i)=>{
        var keys = Object.keys(elem)
        var selectK = keys[keys.length * Math.random() << 0];
        const source = elem[selectK];
        selectQ= { [selectK]:source,
          ...selectQ
        }
      })
      updateUserQuest(selectQ,uid)
      return selectQ;
  })
  return fetchData(result);
}