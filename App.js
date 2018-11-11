
import { Provider, connect } from 'react-redux';
import React from 'react';
import ReduxNavigation,{store} from './src/ReduxNavigation'
import { Font } from 'expo';

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'asd': require('./assets/fonts/seguiemj.ttf'),
    });
  }


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
