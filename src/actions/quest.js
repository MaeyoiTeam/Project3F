import {fetchData,fetchQuest} from './index';
import loadUserData,{fetchSystem} from './api';


export const getQuest = (data) => {
  const result = loadUserData(data, "quest").then((obj)=> Object.values(obj));
   return fetchData(result);
}


export const randomQuest=()=>{
  const result = fetchSystem("questList");
  result.then((data)=>{
    //TODO Random Quest and Select 3 quest then return
    console.log(data);
  })
  return fetchQuest(result);
}