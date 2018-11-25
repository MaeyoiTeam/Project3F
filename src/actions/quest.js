import {
  fetchData,
  fetchQuestList,
  fetchHistoryList,
  fetchModal
} from './index';
import loadUserData, {
  fetchSystem,
  updateUserQuest,
  updateScore,
  moveToDone,
  updateAchieve,
  updateWalkStacks,
  clearOver
} from './api';
import {
  HISTORY_DATA_SUCCESS,
  HISTORY_DATA_FAILURE,
  MODAL_OPEN,
  MODAL_CLOSE
} from '../constants';
import {
  navigate
} from './index'
const moment = require('moment')

// Get during Quest List form userData 
export const getQuestList = (uid, type) => {
  const result = loadUserData(uid, "quest").then((obj) => {
    switch (type) {
      case "undone":
        return Object.entries(obj.undone)
      case "done":
        return Object.entries(obj.done)
      case "over":
        return obj.over
      default:
        return null
    }
  });
  switch (type) {
    case "undone":
      return fetchQuestList(result);
    case "done":
      return fetchHistoryList(result);
    case "over":
      return fetchModal(result);
    default:
      return null
  }
}




//Update Middleware
export const updateQuestDone = (user, key, type) => {
      return (dispatch)=>{
        var quest = user.quest;
        var quest = quest[type];
        if (Array.isArray(quest)) {
          quest.push(key);
        } else {
          quest = [key];
        }
        quest = {
          [type]: quest,
          ...user.quest
        }
        // update Achievement
        updateAchieve(user.uid,quest).then((newAchieve)=>{
          if (Object.values(newAchieve).length>=1) {
            dispatch({
              type:HISTORY_DATA_SUCCESS,
              payload:{...newAchieve}
            }); 
          }
          else{
            dispatch({
              type:HISTORY_DATA_FAILURE,
            }); 
          }
         
        })
          
     } 
}

// Update Quest while During Quest
export const updateQuest = (user, key, point) => {
  const result = updateScore(user.uid, key, point).then((quest) => {
    if (quest.current >= quest.target) {
      return moveToDone(user.uid, key, quest).then((levelType) => {
        return { ...levelType,
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
export const fetchQuest = (uid, key, type) => {
  const path = "quest/" + type + "/" + key;
  const result = loadUserData(uid, path).then((obj) => {
    return {
      key: key,
      ...obj
    }
  });

  return fetchData(result);
}

//Random Quest from system
export const randomQuest = (user) => {
  return async (dispatch) => {
    //? อยากทำให้ เลเวลTypeเยอะ ยิ่้งรับเควสได้เยอะ 
    const result = await fetchSystem("questList").then((data) => {
      //* *สุ่มเควสจากแต่ละtype 1อัน

      var keysType = Object.keys(data)
      var slectQuests = {};
      const keys = ["food", "rest"];
      for (keyType of keys) {
        const quest = data[keyType];
        var keysQuest = Object.keys(data[keyType])
        //TODO แบ่งระดับความยากง่าย
        if (Object.keys(user.quest).includes(keyType)) {
          const keyQuestUser = Object.entries(user.quest).filter(type => type[0] == keyType);
          keysQuest = keysQuest.filter(quest => {
            const questlist = keyQuestUser[0];
            return !questlist[1].includes(quest);
          });
        }
        var selectKeyQuest = keysQuest[keysQuest.length * Math.random() << 0];
        const source = quest[selectKeyQuest]
        if (selectKeyQuest != null) {
          slectQuests = {
            [selectKeyQuest]: {
              type: keyType,
              current: 0,
              ...source
            },
            ...slectQuests
          };
        }
      }
      //test Walk Quest
      date = new Date()
      keyDate = moment(date).format("DMMMYY").toString()
      console.log(keyDate)
      slectQuests = {
        [keyDate]: {
          type: "walk",
          start: date.toISOString(),
          last: new Date(date.setHours(24, 0, 0, 0)).toISOString()
        },
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
  let result = fetchSystem("walkScore").then((allScore) => {
    const filterScore = Object.entries(allScore).filter((systemScore) => {
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

export const finishQuestWalk = (user, key, modalData, stepCount) => {
  return async (dispatch) => {
    const quest = Object.values(modalData);
    fetchSystem("walkScore").then(allScore => {
      const filterScore = Object.entries(allScore).filter((systemScore) => {
        return stepCount >= systemScore[0]
      })
      let star = 0;
      let walkStacks = []
      filterScore.map((obj) => star += obj[1].star);
      filterScore.map((obj) => walkStacks.push(obj[0]));

      let data = { ...quest[0],
        stepCount,
        star: star
      }
      moveToDone(user.uid, key, data);
      const result = updateWalkStacks(user.uid, walkStacks).then(updatedStacks => {
        updateAchieve(user.uid, updatedStacks).then((newAchieve) => {
        loadUserData(user.uid,'quest/done/walk').then(walkHistory=>{
          let walksCount =[]
          var date = new Date();
          for(let i=0;i<7;i++){
            date.setDate(date.getDate()-1);
            const keyDate = moment(date).format("DMMMYY").toString()
            let stepCount=0;
            const walkDate = walkHistory[keyDate];
            if(walkDate!=null){
              stepCount=walkDate.stepCount
            }
            walksCount.push({date:keyDate,stpeCount:stepCount})
          }
          return dispatch({
            type: MODAL_OPEN,
            payload: {
              walkHistory:walksCount,
              achievement: newAchieve,
              walkStacks: updatedStacks,
              start:quest[0].start,
              star:star,
              last:quest[0].last,
              
            }
          })
        })
        }).catch((e) => console.log(e))
      })
    })
  }
}
export const clearFinishQuestWalk = (user) => {
  return async (dispatch) => {
    clearOver(user.uid).then(() => dispatch({
      type: MODAL_CLOSE
    }))
  }
}