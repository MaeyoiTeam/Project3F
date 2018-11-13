import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import { randomQuest,getQuestList,fetchQuest } from '../actions/quest'
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            questlist:{},
            haveQuest:false
        }
    }

    componentWillMount() {
        this.props.getQuestList(this.props.authReducer.data.uid, "undone")
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
         if (prevProps.questReducer.data != this.props.questReducer.data) {
             this.setState({
                 questlist:this.props.questReducer.data,
                 haveQuest:this.props.questReducer.haveQuest
                 })
         }
    }

     randomQ=()=>{
       return new Promise(async (resolve, reject) => {
           this.props.randomQuest(this.props.authReducer.data).then(()=>{
               if (this.props.authReducer.isAuth) {
                this.props.getQuestList(this.props.authReducer.data.uid, "undone")
                   return resolve("QuestList")
               } else {
                   return reject("SignIn")
               }
           })
            
       })
    } 

    render(){
        const {authReducer,questReducer} = this.props;
        const {haveQuest,questlist} = this.state
        if(authReducer.isAuth){
            if(questReducer.haveQuest){
                return(
                    <View>
                {    haveQuest &&   questlist.map((info, i) =>
                            <View key={i}>
                                <Text>Quest name: {info[1].name}</Text>
                                <Text>Quest type: {info[1].type}</Text>
                                <Button title={"Play "+info[1].name}
                                onPress = {
                                        () => {
                                            this.props.fetchQuest(authReducer.data.uid,info[0],"undone")
                                            this.props.navigation.navigate({
                                                routeName: 'Quest'
                                            });
                                        }
                                }
                                />
                            </View>
                        )
            }          
                    </View>
                );
            }
            else{
                return(
                <View>
                    { <Button title="Let's Achieve!" 
                        onPress={async ()=>{let path = await this.randomQ();
                        }}
                    /> }
                    <Button title="Go QuestList" 
                        onPress={()=>this.props.navigation.navigate('QuestList')}
                    />
                    <Button title="History QuestList" 
                        onPress={()=>this.props.navigation.navigate('HistoryQuestList')}
                    />
                    <Button title="Go Pedo" 
                        onPress={()=>this.props.navigation.navigate('Pedo')}    
                    />
                </View>
        );
            }
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
     getQuestList, randomQuest, fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)