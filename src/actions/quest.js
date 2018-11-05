import {fetchData,fetchQuestList} from './index';
import loadUserData,{fetchSystem,updateUserQuest,updateScore} from './api';



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
export const randomQuest=(data)=>{
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
      updateUserQuest(selectQ,data.uid)
      return selectQ;
  })
  return fetchData(result);
}