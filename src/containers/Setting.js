import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
class Setting extends Component {
    static navigationOptions = () => ({
 
  });

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.pa1}></View>
            <View style={styles.pa2}>
                <Text>This is Setting I am nutza007</Text>
                <Button title="Switch Account"
                    onPress={() => this.props.navigation.navigate("SignIn")    }
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 150,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 100  
                      }}/>
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center'
  },
  pa1: {
    backgroundColor: 'white', 
    flex: 0.2,
  },
    pa2: {
      backgroundColor: 'white', 
      flex: 0.4,
    },
});
export default Setting;