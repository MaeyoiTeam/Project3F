import {fetchData} from './index';
import loadData from './api';







export const getQuest = (data) => {
  const result = loadData(data,'quest');
   return fetchData(result);
}








export const randomQuest=()=>{


}