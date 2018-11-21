import loadUserData,{updateDataUserNotification} from './api'
import {NOTIFICATION_DATA_FAILURE,NOTIFICATION_DATA_SUCCESS} from '../constants'

export const updateNotification = (uid,newLog,notiLogs)=>{
    return async (dispatch) => {
        
        if(Array.isArray(notiLogs)){
            notiLogs.push(newLog);
            let sortnotiLogs = notiLogs.sort((a, b) => {
                const x = new Date(a.date)
                const y  =  new Date(b.date)
                if(x>y){
                    return 1
                }else if(x<y){
                      return  -1
                }
                else{
                    return 0
                }
              });
        }else{
            let sortnotiLogs=[newLog];
        }
        if (sortnotiLogs.length > 10) {
            sortnotiLogs.shift()
        }
        updateDataUserNotification(uid, sortnotiLogs).then(() => dispatch({
            type:NOTIFICATION_DATA_SUCCESS,
            payload: sortnotiLogs
        }))
        .catch(e=>dispatch({
            type: NOTIFICATION_DATA_FAILURE
        }))
    }
}

export const getNotifications = (uid) => {
    return async (dispatch) => {
        loadUserData(uid,'notificationLog').then(result => { 
            return dispatch({
                type: NOTIFICATION_DATA_SUCCESS,
                payload: result
            })
        })
            .catch(e => {
                console.log(e)
                dispatch({
                    type: NOTIFICATION_DATA_FAILURE
                })
            })
    }
}