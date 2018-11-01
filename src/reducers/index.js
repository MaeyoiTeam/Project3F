import { combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import authReducer from "./authReducer";
import rankReducer from './rankReducer';
import navReducer from './navReducer';
//can add more method-------------here
export default combineReducers({
    nav: navReducer,
    fetchReducer,
    rankReducer,
    authReducer,
})