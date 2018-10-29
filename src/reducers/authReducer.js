import {FETCH_USER_FAIL,FETCH_USER_SUCCESS } from "../constants";


const initialState = {
    isAuth:false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {...state,
                isAuth: true,
                data:action.payload}
        case FETCH_USER_FAIL:
            return {...state,
                 isAuth: false,
                data:{}
            }
        default:
            return state;
    }
};