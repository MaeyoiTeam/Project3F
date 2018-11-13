import React, { PureComponent } from 'react';
import { BackHandler } from "react-native";
import thunk from 'redux-thunk'
import reducer from './reducers';
import Navigator from './config/routes'
import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import {NavigationActions,addNavigationHelpers} from 'react-navigation'
// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const ReduxAppNavigator = reduxifyNavigator(Navigator, "root");

class ReduxNavigation extends PureComponent {
    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress",this.onBackPress);
    }
    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress=()=>{
        const {dispatch,state} =this.props;
        if (state.index === 1||state.index===0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
    render(){
        const {dispatch,state,nav } =this.props;
        return <ReduxAppNavigator dispatch={dispatch} state={state}/>;
    }
}
const mapStateToProps = (state) => ({
    state: state.nav,
});
export default connect(mapStateToProps)(ReduxNavigation)

export const store = createStore(
    reducer,
    applyMiddleware(thunk, middleware),
);