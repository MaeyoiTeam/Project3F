import React, { Component }  from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createSwitchNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
//Containers
import Ranking from '../containers/Ranking';
import Notifications from '../containers/Notifications';
import Profile from '../containers/Profile';
import Home from '../containers/Home';
import Setting from '../containers/Setting';
import SignIn from '../containers/stacks/SignIn';
import FirstPage from '../containers/stacks/FirstPage';
import Quest from '../containers/stacks/quests/Quest';
import QuestWalk from '../containers/stacks/quests/QuestWalk';
import QuestRest from '../containers/stacks/quests/QuestRest';
import HistoryQuestList from '../containers/stacks/HistoryQuestList';
import Achievement from '../containers/stacks/Achievement';
import OtherProfile from '../containers/stacks/otherProfile'
//Component
import LeftComponent from '../component/Header/LeftComponent';
import MidComponent from '../component/Header/MidComponent';
import RightComponent from '../component/Header/RightComponent';
import  ModalScreen  from '../component/Modal/ModalScreen';


const BottomTabs = createMaterialBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarColor: '#336600',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-contact' : 'ios-contact-outline') : 'md-contact' } style={{ color: tintColor }} />
        )
      }
    },
    Ranking: {
      screen: Ranking,
      navigationOptions: {
        tabBarLabel: 'Ranking',
        tabBarColor: '#CC0099',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-trending-up' } style={{ color: tintColor }} />
        )
      }
    },
     Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarColor: '#3366FF',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home' } style={{ color: tintColor }} />
        )
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarColor: '#CC6600',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={30} name={ Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-notifications-outline' } style={{ color: tintColor }} />
        )
      }
    },
    Settings: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarColor: '#4c4c4c',
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
          navigationOptions:{ /* header:null */
            
             headerLeft:(<LeftComponent/>),
            headerTitle:(<MidComponent/>),
            headerRight:(<RightComponent/>), 
            headerStyle: {
              height:45
            } 
          }
    },
    OtherProfile: {
      screen: OtherProfile,
      navigationOptions: {
        headerStyle: {
          height:45,
      }
      }
    },
    History: {
      screen: HistoryQuestList,
      navigationOptions: {
        headerStyle: {
          height:45,
      }
    }
   },
    Achievement: {
      screen: Achievement,
      navigationOptions: {
        title:"Achievement",
        headerStyle: {
          height:45,
      },
  
      }
    },
    Quest: {
      screen: Quest,
      navigationOptions: {
        headerStyle: {
          height:45,
      },
      
      }
    },
    QuestWalk: {
      screen: QuestWalk,
      navigationOptions: {
        headerStyle: {
          height:45,
      },
      
      }
    },
    QuestRest: {
      screen: QuestRest,
      navigationOptions: {
        headerStyle: {
          height:45,
          },
          
      },
    }
  },
  
  {
    mode: "modal",
    headerLayoutPreset: "center"
  }
);

const Navigator = createSwitchNavigator({
  FirstPage: {
    screen: FirstPage,
    navigationOptions: {

    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
    }
  },
  Stack: {
    screen: Stack,
    navigationOptions: {}
  },
  ModalScreen: {
      screen: ModalScreen,
    },
}, {
  mode: 'modal',
  headerMode: 'none',
  cardStyle:{
    backgroundColor:"transparent",
    opacity:0.50
  }
});

export default Navigator;

