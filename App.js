
import { Provider, connect } from 'react-redux';
import React from 'react';
import ReduxNavigation,{store} from './src/ReduxNavigation'

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
        <ReduxNavigation />
      </Provider>
    );
  }
}

export default App;