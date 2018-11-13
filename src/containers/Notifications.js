import { View,Text,StyleSheet,ImageBackground } from 'react-native';
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
                 <Ionicons name="md-checkmark-circle" size={80} color="green" />
                 <Image
        source={require('../../image/facebook.jpg')}
        fadeDuration={0}
        style={{width: 50, height: 50}}
      />
     <SocialIcon
  type='facebook'
  style={{width: 100, height: 100, borderRadius: 100}}
  iconSize={50}
/>
<SocialIcon
  type='google-plus-official'
  style={{width: 100, height: 100, borderRadius: 100, backgroundColor:'white',borderWidth: 0}}
  iconSize={100}
  iconColor='red'
/>
<SocialIcon
  title='Sign In With Facebook'
  button
  type='facebook'
/>
<SocialIcon
  title='Sign In With Google'
  button
  type='google-plus-official'
  
/>
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