import {FETCHING_DATA,FETCHING_DATA_FAILURE,FETCHING_DATA_SUCCESS,FETCH_USER, RANK_DATA, RANK_DATA_SUCCESS, RANK_DATA_FAILURE} from '../constants';
import firebase from '../config/firebase'
import loadData,{updateDataUser,rankingUser,updateScore} from './api';
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


export const getQuest=(data) => fetchData(loadData(data))

export const fetchData = (fn) => {
    return (dispatch) => {
        dispatch(SetStageToFetching());
        fn
        .then(result=>{
             dispatch(SetStageToSuccess(result))
        }).catch(error=>{
             dispatch(SetStageToFailure())
             console.log(error)
        })
    }
}


export const navigate = (nav)=>{
    console.log("work")
    return (dispatch)=>{
        dispatch(NavigationActions.navigate({routeName:nav}));
    }
} 


export const fetchRanking = () => fetchRank(rankingUser());


const fetchRank = (fn) => {
    return (dispatch) => {
        dispatch({ type:RANK_DATA });
        fn
            .then(result => {
                dispatch({type:RANK_DATA_SUCCESS,payload:result})
            }).catch(error => {
                dispatch({type:RANK_DATA_FAILURE})
                console.log(error)
            })
    }
}


export const upScore = (uid,point) => dispatch => {
            dispatch({type:FETCHING_DATA})
            updateScore(uid,point).then(result => {
                dispatch({
                    type: FETCHING_DATA_SUCCESS,
                    payload: result
                })
            }).catch(err => {
                dispatch({
                    type: FETCHING_DATA_FAILURE
                })
                console.log(err)
            })
    }