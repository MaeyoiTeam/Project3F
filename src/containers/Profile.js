import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';

import LeftComponent from '../component/Header/LeftComponent';
import MidComponent from '../component/Header/MidComponent';
import RightComponent from '../component/Header/RightComponent';


class Profile extends Component{
    static navigationOptions = () => ({
    title: 'Header',
    headerTintColor: "#ff5",
    headerStyle: {
      backgroundColor: 'red'
    },
    headerLeft:<LeftComponent  />,
    headerRight:<RightComponent  />
  });

    render(){
        return(
            <View>
                <Text>This is Profile</Text>
            </View>
        );
    }
}

export default Profile;