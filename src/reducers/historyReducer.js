import { HISTORY_DATA, HISTORY_DATA_FAILURE, HISTORY_DATA_SUCCESS } from '../constants';

const initialState = {
    data: [],
    isfetching: false,
    haveHISTORY:false,
    isError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HISTORY_DATA:
            return { ...state, isfetching: true, haveHISTORY: false,};
        case HISTORY_DATA_SUCCESS:
            return { ...state, isfetching: false, data: action.payload ,haveHISTORY:true,};
        case HISTORY_DATA_FAILURE:
            return { ...state, isfetching: false, isError: true ,haveHISTORY:false,};
        default:
            return state;
    }
};
