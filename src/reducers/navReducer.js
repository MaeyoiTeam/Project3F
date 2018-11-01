import {
  createStackNavigator,
} from 'react-navigation';
import {
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import Navigator from '../config/routes'
const navReducer = createNavigationReducer(Navigator);

export default navReducer

