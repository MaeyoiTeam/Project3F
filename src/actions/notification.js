import loadUserData,{updateDataUserNotification} from './api'
import {NOTIFICATION_DATA_FAILURE,NOTIFICATION_DATA_SUCCESS,NOTIFICATION_DATA} from '../constants'

export const updateNotification = (uid,newLog,notiLogs)=>{
    return async (dispath) => {
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
        if (sortnotiLogs.length > 10) {
            sortnotiLogs.shift()
        }
        dispath({type:NOTIFICATION_DATA});
        updateDataUserNotification(uid, sortnotiLogs).then(() => dispatch({
            type:NOTIFICATION_DATA_SUCCESS,
            payload: sortnotiLogs
        }))
        .catch(e=>dispath({
            type: NOTIFICATION_DATA_FAILURE
        }))
    }
}

export const getNotifications = (uid) => {
    return async (dispath) => {
        dispath({type:NOTIFICATION_DATA});
        loadUserData(uid,'notificationLog').then(result => { 
            return dispath({
                type: NOTIFICATION_DATA_SUCCESS,
                payload: result
            })
        })
            .catch(e => {
                console.log(e)
                dispath({
                    type: NOTIFICATION_DATA_FAILURE
                })
            })
    }
}