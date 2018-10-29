import {RANK_DATA,RANK_DATA_FAILURE,RANK_DATA_SUCCESS} from '../constants';

const initialState = {
    data:[],
    isFetching: false,
    isError: false
}

export default (state = initialState, action) => {
  switch (action.type) {    
        case RANK_DATA:
            return{...state,isFetching:true};
        case RANK_DATA_SUCCESS:
            return{...state,isFetching: false,data:action.payload};
        case RANK_DATA_FAILURE:
            return{...state,isFetching:false,isError:true};
        default:
            return state;
    }
};