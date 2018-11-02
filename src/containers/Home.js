import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
class Home extends Component {




    render(){
        return(
            <View>
                <Button title="Let's Achieve!" 
                    onPress={()=>this.props.navigation.navigate("QuestList")}
                />
            </View>
        );
    }
}

export default Home;