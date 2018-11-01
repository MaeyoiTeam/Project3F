import React from 'react';

import { createStackNavigator, createBottomTabNavigator,StackNavigator } from 'react-navigation';
//Component
import Ranking from '../component/Ranking';
import SignIn from '../component/SignIn';
import AddData from '../component/AddData';
import Profile from '../component/Profile';
import LeftComponent from '../component/Header/LeftComponent';
import Container from '../Container';
import Headbar from '../component/Header/Headbar';
const Tabs = createBottomTabNavigator({
    SignIn: {
        screen: SignIn,
    },
    Profile: {
        router:Profile,
        screen: Profile,
        navigationOptions: {
            headerTitle: 'Home', // เพิ่ม title ให้ส่วนหัวเป้นคำว่า Home
        }
    },

    Ranking: {
        screen: Ranking
    },
    AddData:{
        screen:AddData 
    },
    
});

const Navigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: (<Headbar/>)
        }
    },
    Profile2:{
        screen:AddData,
        navigationOptions: {
            header:(<Headbar/>)
        },
    }
    
}, {
    initialRouteName: 'Home',
});


export default Navigator;