import { NOTIFICATION_DATA_SUCCESS,NOTIFICATION_DATA_FAILURE, NOTIFICATION_DATA } from '../constants';

const initialState = {
    data: [],
    isFetching:false,
    haveNotification: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_DATA:
            return { ...state, haveNotification: false, isFetching:true };
        case NOTIFICATION_DATA_SUCCESS:
            return { ...state, haveNotification: true, isFetching:false,data: action.payload};
        case NOTIFICATION_DATA_FAILURE:
            return { ...state,
                haveNotification: false, isFetching: false, isError: true
            };
        default:
            return state;
    }
};
