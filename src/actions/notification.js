import loadUserData,{updateDataUserNotification} from './api'
import {NOTIFICATION_DATA_FAILURE,NOTIFICATION_DATA_SUCCESS,NOTIFICATION_DATA} from '../constants'
import { Notifications} from 'expo'
import { Platform} from 'react-native'
export const updateNotification = (uid,newLog)=>{
    return  (dispatch) => {
        loadUserData(uid,'notificationLog').then(notiLogs=>{
            console.log("loadUserData")
            var sortnotiLogs=[];
            if (Array.isArray(notiLogs)) {
                notiLogs.push(newLog);
               sortnotiLogs = notiLogs.sort((a, b) => {
                    const x = new Date(a.date)
                    const y = new Date(b.date)
                    if (x > y) {
                        return 1
                    } else if (x < y) {
                        return -1
                    }
                    else {
                        return 0
                    }
                });
            } else {
                sortnotiLogs.push(newLog);
            }
            if (sortnotiLogs.length > 10) {
                sortnotiLogs.shift()
            }
            dispatch({ type: NOTIFICATION_DATA });
            updateDataUserNotification(uid, sortnotiLogs).then(() => dispatch({
                type: NOTIFICATION_DATA_SUCCESS,
                payload: sortnotiLogs
            }))
        })
        
    }
}

export const getNotifications = (uid) => {
    return (dispatch) => {
        dispatch({type:NOTIFICATION_DATA});
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
