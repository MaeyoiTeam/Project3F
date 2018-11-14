import { View,Text,StyleSheet,ImageBackground,TouchableOpacity } from 'react-native';
import React,{Component} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { SocialIcon } from 'react-native-elements'

class Notifications extends Component {
    static navigationOptions = () => ({
 
  });




    render(){
        return(
            <View>
                <Text>This is Notifications</Text>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container1:{
        flex: 1,     
    },
})
export default Notifications;