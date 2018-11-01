
import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import React from 'react';
import reducer from './src/reducers/';
import Navigator from './src/config/routes'
import thunk from 'redux-thunk'

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const Root = reduxifyNavigator(Navigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(Root);

const store = createStore(
  reducer,
  applyMiddleware(thunk, middleware),
);

class App extends React.Component {

  constructor(){
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  render() {
    return (
      <Provider store={store} >
        <AppWithNavigationState  />
      </Provider>
    );
  }
}
export default App;