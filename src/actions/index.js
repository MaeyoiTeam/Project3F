import {FETCHING_DATA,FETCHING_DATA_FAILURE,FETCHING_DATA_SUCCESS,
    FETCH_USER, 
    RANK_DATA, RANK_DATA_SUCCESS, RANK_DATA_FAILURE,
    QUEST_DATA, QUEST_DATA_SUCCESS, QUEST_DATA_FAILURE,
    HISTORY_DATA, HISTORY_DATA_FAILURE, HISTORY_DATA_SUCCESS,
    MODAL_CLOSE,MODAL_OPEN
} from '../constants';
import loadUserData,{rankingUser,updateScore}  from './api';
import { NavigationActions } from 'react-navigation'
export const SetStageToSuccess =(data)=>({
    type:FETCHING_DATA_SUCCESS,
    payload:data
});
export const SetStageToFetching = (data) => ({
    type: FETCHING_DATA
});
export const SetStageToFailure = (data) => ({
    type: FETCHING_DATA_FAILURE
});

export const fetchData = (fn) => {
    return (dispatch) => {
        dispatch(SetStageToFetching());
        fn.then(result=>{
             dispatch(SetStageToSuccess(result))
        }).catch(error=>{
             dispatch(SetStageToFailure())
             console.log(error)
        })
    }
}

export const navigate = (nav)=>{
    return (dispatch)=>{
        dispatch(NavigationActions.navigate({routeName:nav}));
    }
} 


export const fetchQuestList = (fn) => {
    return (dispatch) => {
        dispatch({ type:QUEST_DATA }); 
        fn.then(result => {
                dispatch({type:QUEST_DATA_SUCCESS,payload:result})
            }).catch(error => {
                dispatch({type:QUEST_DATA_FAILURE})
                console.log(error)
            })
    }
}
export const fetchHistoryList = (fn) => {
    return (dispatch) => {
        dispatch({ type:HISTORY_DATA });
        fn.then(result => {
                dispatch({type:HISTORY_DATA_SUCCESS,payload:result})
            }).catch(error => {
                dispatch({type:HISTORY_DATA_FAILURE})
                console.log(error)
            })
    }
}


export const fetchModal = (fn) => {
    return (dispatch) => {
        fn.then(result =>{
                if(result!=null){
                    dispatch({type:MODAL_OPEN,payload:result})
                }else{
                    dispatch({type:MODAL_CLOSE})
                }
            }).catch(error => {
                dispatch({type:MODAL_CLOSE})
                console.log(error)
            })
    }
}

//############################################### Ranking ###############################################
export const fetchProfile = (uid) => {
    const result = loadUserData(uid).then((obj) => {
        return { uid: uid, displayName: obj.displayName, photoURL: obj.photoURL + "?width=256", levelQ: obj.levelQ, email: obj.email,
          star: obj.star, achieve: obj.achieve, walkStacks: obj.walkStacks };
    });
    return fetchData(result);
}


export const fetchRanking = () => {
    return (dispatch) => {
        dispatch({ type: RANK_DATA });
        rankingUser()
            .then(result => {
                dispatch({ type: RANK_DATA_SUCCESS, payload: result })
            }).catch(error => {
                dispatch({ type: RANK_DATA_FAILURE })
                console.log(error)
            })
    }
}
//############################################### Achievement ###############################################

export const fetchAchievement = (uid) => {
    const result = loadUserData(uid,"achieve").then(obj => {
        return {
            ...obj
        }
    });
    return fetchHistoryList(result);
}

export const clearMiddleHistory=()=>{
    return dispatch=>{
        dispatch({ type: HISTORY_DATA });
    }
}

export const clearFechReducer=()=>{
    return dispatch=>{
        dispatch({ type: FETCHING_DATA });
    }
}