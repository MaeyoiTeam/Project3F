import { HISTORY_DATA, HISTORY_DATA_FAILURE, HISTORY_DATA_SUCCESS } from '../constants';

const initialState = {
  data: [],
  isFetching: false,
  haveHISTORY: false,
  isError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case HISTORY_DATA:
            return { ...state, isFetching: true, haveHISTORY: false };
        case HISTORY_DATA_SUCCESS:
            return { ...state, isFetching: false, data: action.payload, haveHISTORY: true };
        case HISTORY_DATA_FAILURE:
            return { ...state, isFetching: false, isError: true, haveHISTORY: false };
        default:
            return state;
    }
};
