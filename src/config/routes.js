import React, { Component }  from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createDrawerNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
//Containers
import Ranking from '../containers/Ranking';
import SignIn from '../containers/SignIn';
import Notifications from '../containers/Notifications';
import Profile from '../containers/Profile';
import Home from '../containers/Home';
import Setting from '../containers/Setting';
import QuestList from '../containers/QuestList';
//Component
import LeftComponent from '../component/Header/LeftComponent';
import MidComponent from '../component/Header/MidComponent';
import RightComponent from '../component/Header/RightComponent';



const BottomTabs = createMaterialBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarColor: '#1e1e1d',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-contact' : 'ios-contact-outline') : 'md-contact' } style={{ color: tintColor }} />
        )
      }
    },
    Ranking: {
      screen: Ranking,
      navigationOptions: {
        tabBarLabel: 'Ranking',
        tabBarColor: '#ff7538',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-trending-up' } style={{ color: tintColor }} />
        )
      }
    },
     Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarColor: '#842655',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home' } style={{ color: tintColor }} />
        )
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarColor: '#ff3899',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-notifications-outline' } style={{ color: tintColor }} />
        )
      }
    },
    Settings: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarColor: '#ff3899',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-settings' } style={{ color: tintColor }} />
        )
      }
    }
  },{
    shifting: true,
    activeTintColor: 'white',
    inactiveTintColor: '#ddd',
    barStyle: {
      height: 55
    }
  }
);
const Navigator =createStackNavigator({
Home:{    screen:BottomTabs,
          navigationOptions:{
            
            headerLeft:(<LeftComponent/>),
            headerTitle:(<MidComponent/>),
            headerRight:(<RightComponent/>),
            headerStyle: {
            }
          }
    },
QuestList:{ screen:QuestList,
            navigationOptions: {
            headerTitle: "Quest",
            headerStyle: {}
            }
          },
SignIn: {
      screen: SignIn,
      navigationOptions: {
      }
    },

},{
  mode:"modal",
  headerLayoutPreset:"center"
});


export default Navigator;