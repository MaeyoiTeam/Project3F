import {fetchData,fetchQuest} from './index';
import loadUserData,{fetchSystem,updateUserQuest} from './api';


export const getQuest = (data) => {
  const result = loadUserData(data, "quest").then((obj)=> Object.values(obj));
   return fetchData(result);
}


export const randomQuest=(uid)=>{
  const result = fetchSystem("questList").then((data)=>{
    //TODO Random Quest and Select 3 quest then return
      var keys = Object.keys(data)
      const selectQ = data[keys[keys.length * Math.random() << 0]];
      console.log(uid)
      updateUserQuest(selectQ,uid)
      return selectQ;
  })
  return fetchQuest(result);
}