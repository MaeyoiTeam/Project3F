import {FETCHING_DATA,FETCHING_DATA_FAILURE,FETCHING_DATA_SUCCESS,
    FETCH_USER, 
    RANK_DATA, RANK_DATA_SUCCESS, RANK_DATA_FAILURE,
    QUEST_DATA, QUEST_DATA_SUCCESS, QUEST_DATA_FAILURE,
    HISTORY_DATA, HISTORY_DATA_FAILURE, HISTORY_DATA_SUCCESS
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

//############################################### Ranking ###############################################
export const fetchProfile = (uid) => {
    console.log(uid)
    const result = loadUserData(uid).then((obj) => {
        return {
            ...obj
        }
    });
    return fetchData(result);
}

export const fetchRanking  = () => {
    return (dispatch) => {
        dispatch({ type:RANK_DATA });
        rankingUser()
            .then(result => {
                dispatch({type:RANK_DATA_SUCCESS,payload:result})
            }).catch(error => {
                dispatch({type:RANK_DATA_FAILURE})
                console.log(error)
            })
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

