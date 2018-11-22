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
        this.randomQ = this.randomQ.bind(this);
        this.goToQuest = this.goToQuest.bind(this);
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

    randomQ(){
           this.props.randomQuest(this.props.authReducer.data).then(()=>{
               if (this.props.authReducer.isAuth) {
                this.props.getQuestList(this.props.authReducer.data.uid, "undone")
               } 
           })
    } 

    goToQuest(info){
        this.props.fetchQuest(this.props.authReducer.data.uid, info[0], "undone");
        let path = 'Home';
        switch (info[1].type) {
            case "food": path = 'Quest';
                break;
            case "walk": path = 'QuestWalk';
                break;
            case "rest": path = "QuestRest";
                break;
            default: path = "Home";
        }
        this.props.navigation.navigate(path);
    }

    render(){
        const {authReducer,questReducer} = this.props;
        const {haveQuest,questlist} = this.state
        if(authReducer.isAuth){
            if(questReducer.haveQuest){
                return(
                    <View>
                {    haveQuest &&   questlist.map((info, i) =>
                            <View key={i} style = {styles.separator}>
                                <Text style = {{textAlign:'center',fontSize:15,paddingTop:20}}>{info[1].name}</Text>
                                <Text style = {{textAlign:'center',fontSize:15,paddingBottom:10}}>type: {info[1].type}</Text>
                                <Button title={"Play "+info[1].name}
                                buttonStyle={{
                                    backgroundColor: "rgba(10, 10,100, 1)",
                                    height:80,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius:360,
                                    }}
                                    onPress={() => this.goToQuest(info)}
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
                            onPress={this.randomQ}
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
    },
    separator: {
        marginVertical: 10,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
     getQuestList, randomQuest, fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)