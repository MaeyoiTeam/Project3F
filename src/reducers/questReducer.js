import { QUEST_DATA, QUEST_DATA_FAILURE, QUEST_DATA_SUCCESS } from '../constants';

const initialState = {
    data: [],
    isfetching: false,
    haveQuest:false,
    isError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case QUEST_DATA:
            return { ...state, isfetching: true, haveQuest: false,};
        case QUEST_DATA_SUCCESS:
            return { ...state, isfetching: false, data: action.payload ,haveQuest:true,};
        case QUEST_DATA_FAILURE:
            return { ...state, isfetching: false, isError: true ,haveQuest:false,};
        default:
            return state;
    }
};
