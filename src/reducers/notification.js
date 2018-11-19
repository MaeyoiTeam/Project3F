import { NOTIFICATION_DATA_SUCCESS,NOTIFICATION_DATA_FAILURE } from '../constants';

const initialState = {
    data: [],
    isfetch: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_DATA_SUCCESS:
            return { ...state, isfetch: true, data: action.payload};
        case NOTIFICATION_DATA_FAILURE:
            return { ...state,
                isfetch: false,
            };
        default:
            return state;
    }
};
