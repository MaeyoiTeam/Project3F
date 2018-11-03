import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
class Setting extends Component {
    static navigationOptions = () => ({
 
  });

    render(){
        return(
            <View>
                <Text>This is Setting</Text>
                <Button title="Switch Account"
                    onPress={() => this.props.navigation.navigate("SignIn")}
                />
            </View>
        );
    }
}

export default Setting;