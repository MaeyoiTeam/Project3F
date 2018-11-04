import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import { randomQuest,getQuestList } from '../actions/quest'
class Home extends Component {

//TODO rerender หลังจากได้ค่าAuthReducerมาจากHeader เพื่อเรียกส่งauthReducer.data ให้ getQuest
//? ไปอ่านLife cylce reactมา
    
    randomQ=()=>{
       return new Promise((resolve, reject) => {
           this.props.randomQuest(this.props.authReducer.data.uid)
           return resolve("QuestList")
       })
    }

    render(){
        if(this.props.authReducer.isAuth){
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
                <Button title="Go Pedo" 
                    onPress={()=>this.props.navigation.navigate('Pedo')}
                />
                
            </View>
        );
        }
        else{
          return <Text>Signing...</Text>
        }
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
    randomQuest, getQuestList
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)