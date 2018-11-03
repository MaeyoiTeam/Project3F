import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import { randomQuest } from '../actions/quest'
class Home extends Component {


    randomQ=()=>{
       return new Promise((resolve, reject) => {
           this.props.randomQuest(this.props.authReducer.data.uid)
           return resolve("QuestList")
       })
    }

    render(){
        return(
            <View>
                <Button title="Let's Achieve!" 
                    onPress={async ()=>{let path = await this.randomQ();
                    this.props.navigation.navigate(path);
                    }}
                />
                <Button title="Go QuestList" 
                    onPress={()=>this.props.navigation.navigate('QuestList')}
                />
                {this.props.questReducer.haveQuest&& <Text>YESS</Text>}
            </View>
        );
    }
}
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
    questReducer:state.questReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    randomQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)