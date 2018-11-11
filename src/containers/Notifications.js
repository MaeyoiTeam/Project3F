import { View,Text,StyleSheet,ImageBackground } from 'react-native';
import React,{Component} from 'react';

class Notifications extends Component {
    static navigationOptions = () => ({
 
  });

    render(){
        return(
            <ImageBackground source={require('../../image/aaa.jpg')}
            style={Styles.container1}>
                <Text>This is Notifications</Text>
            </ImageBackground>
        );
    }
}

const Styles = StyleSheet.create({
    container1:{
        flex: 1,     
    },
})
export default Notifications;