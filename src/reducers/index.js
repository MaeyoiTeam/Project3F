import { combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import authReducer from "./authReducer";
import rankReducer from './rankReducer';
import questReducer from './questReducer'
import nav from './nav';
//can add more method-------------here
export default combineReducers({
    questReducer,
    fetchReducer,
    rankReducer,
    authReducer,
    nav,
})