import { combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import authReducer from "./authReducer";
import rankReducer from './rankReducer';
//can add more method-------------here
export default combineReducers({
    fetchReducer,
    rankReducer,
    authReducer
})