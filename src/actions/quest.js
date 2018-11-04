import {fetchData,fetchQuest} from './index';
import loadUserData,{fetchSystem,updateUserQuest} from './api';


export const getQuest = (data) => {
  const result = loadUserData(data, "quest").then((obj)=>{
    return Object.values(obj)});

   return fetchQuest(result);
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