import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import { randomQuest,getQuestList,fetchQuest } from '../actions/quest'
import FinishDate from '../component/popUps/FinishDate';
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
                                            this.props.fetchQuest(authReducer.data.uid,info[0],"undone");
                                            let path='Home';
                                            switch(info[1].type){
                                                case "food": path='Quest'; 
                                                                break;
                                                case "walk": path='QuestWalk';
                                                                break;
                                                case "rest": path="QuestRest";
                                                                break;
                                                default: path="Home";
                                            }
                                            this.props.navigation.navigate(path);
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
            <View style={styles.container}>
                    <View style={styles.ku1}></View>
                    <View style={styles.ku2}>
                        <Button title="Let's Achieve!" 
                            onPress={async ()=>{let path = await this.randomQ();
                            this.props.navigation.navigate(path);}}
                            buttonStyle={{
                                backgroundColor: "rgba(00, 99,216, 1)",
                                width: 150,
                                height: 40,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 360  
                            }}  
                        />
                    </View>
                    <View style={styles.ku4}>
                        <Button title="Go Pedo" 
                            onPress={()=>this.props.navigation.navigate('Pedo')}
                            buttonStyle={{
                                backgroundColor: "rgba(00, 99,216, 1)",
                                width: 150,
                                height: 40,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 360  
                            }}
                        />
                    </View>
                    {
                        <FinishDate/>
                    }  
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
})
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center'
  },
    
    ku1: {
      backgroundColor: 'white', 
      flex: 0.2,
    },
    ku2: {
      backgroundColor: 'white', 
      flex: 0.2,
    },
    ku3: {
      backgroundColor: 'white', 
      flex: 0.2,
    }
    
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
     getQuestList, randomQuest, fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)