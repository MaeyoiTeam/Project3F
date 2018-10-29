import React,{Component} from 'react';
import Container from './src/Container';
import { View,StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import {Header} from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';
//Component
import Ranking from './src/component/Ranking';
import SignIn from './src/component/SignIn';
import AddData from './src/component/AddData';


const store = configureStore();

const Tabs = createBottomTabNavigator({

    Container: {
        screen: Container
    },
    SignIn: {
        screen: SignIn
    },
    Ranking: {
        screen: Ranking
    },
    AddData:{
        screen:AddData
    }
});

const Stack = createStackNavigator({
    Home: {
        screen: Tabs
    },
    

});
const Top = createMaterialTopTabNavigator({
    tabBarComponent: props =>
      <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Project3F', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />}
);


class App extends Component {

    render(){
        return(
    <Provider store={store}>
    <View style={styles.container}>
            <Top/>
        <Stack/>
    </View>
    </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5ff'
    }
});

export default App;