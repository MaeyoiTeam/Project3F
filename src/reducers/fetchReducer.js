import {FETCHING_DATA,FETCHING_DATA_FAILURE,FETCHING_DATA_SUCCESS} from '../constants';

const initialState = {
    data:{},
    isFetching: false,
    isError: false
}

export default (state = initialState, action) => {
  switch (action.type) {    
        case FETCHING_DATA:
            return{...state,isFetching:true};
        case FETCHING_DATA_SUCCESS:
            return{...state,isFetching: false,data:action.payload};
        case FETCHING_DATA_FAILURE:
            return{...state,isFetching:false,isError:true};
        default:
            return state;
    }
};
