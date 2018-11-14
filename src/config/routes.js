import React, { Component }  from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
//Containers
import Ranking from '../containers/Ranking';
import Notifications from '../containers/Notifications';
import Profile from '../containers/Profile';
import Home from '../containers/Home';
import Setting from '../containers/Setting';
import SignIn from '../containers/stacks/SignIn';
import Loading from '../containers/stacks/Loading';
import Quest from '../containers/stacks/Quest';
import Pedo from '../containers/stacks/Pedo';
import HistoryQuestList from '../containers/stacks/HistoryQuestList';
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
        tabBarColor: '#1E90FF',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-contact' : 'ios-contact-outline') : 'md-contact' } style={{ color: tintColor }} />
        )
      }
    },
    Ranking: {
      screen: Ranking,
      navigationOptions: {
        tabBarLabel: 'Ranking',
        tabBarColor: '#1E90FF',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-trending-up' } style={{ color: tintColor }} />
        )
      }
    },
     Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarColor: '#1E90FF',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home' } style={{ color: tintColor }} />
        )
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarColor: '#1E90FF',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-notifications-outline' } style={{ color: tintColor }} />
        )
      }
    },
    Settings: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarColor: '#1E90FF',
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
const Stack = createStackNavigator({
Home:{    screen:BottomTabs,
          navigationOptions:{
            
            headerLeft:(<LeftComponent/>),
            headerTitle:(<MidComponent/>),
            headerRight:(<RightComponent/>),
            headerStyle: {
            }
          }
    },
HistoryQuestList:{ screen:HistoryQuestList,
            navigationOptions: {
            headerTitle: "HistoryQuestList",
            headerStyle: {}
            }
          },
 Pedo: {
  screen: Pedo,
  navigationOptions: {}
}, 
Quest: {
  screen: Quest,
  navigationOptions: {}
},
},{
  mode:"modal",
  headerLayoutPreset:"center"
});

const Navigator = createSwitchNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {}
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {}
  },
  Stack: {
    screen: Stack,
    navigationOptions: {}
  },
});

export default Navigator;

