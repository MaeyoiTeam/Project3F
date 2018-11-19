import { MODAL_OPEN,MODAL_CLOSE } from '../constants';

const initialState = {
    data: [],
    showModal: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            return { ...state, showModal: true, data: action.payload};
        case MODAL_CLOSE:
            return { ...state, showModal: false,};
        default:
            return state;
    }
};
