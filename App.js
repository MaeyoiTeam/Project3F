
import { Provider, connect } from 'react-redux';
import React from 'react';
import ReduxNavigation,{store} from './src/ReduxNavigation'
import { Font } from 'expo';
import { YellowBox } from 'react-native';
import _ from 'lodash';
console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  console.log(message)
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
  if (message.indexOf('react-native-paper') <= -1) {
    _console.warn(message);
  }
};

export default class App extends React.Component {
    constructor() {
      super();
    }
   
    async componentDidMount() {
      await Font.loadAsync({
        'asd': require('./assets/fonts/CSPraJad.otf'),
      });
  
      this.setState({ fontLoaded: true });
    }

  render() {
    return (
      <Provider store={store} >
        <ReduxNavigation />
      </Provider>
    );
  }
}
