import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import { Pedometer } from "expo";
import {updateQuest,fetchQuest,updateQuestDone,getQuestList,compareScore} from '../../../actions/quest';
import * as Expo from "expo";
class QuestWalk extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Quest Walk"),
      };
  };
    constructor(props){
        super(props);

        this.state={
            key:"none",
            name: "none",
            type: "none",
            detail:"none",
            current:0,
            target:0,
            point:0,
            star:0,
            level:0,
            start:'',
            time: new Date(),
            isComplete:false,
            prevLevel:{},
            stepCount: 0,
            targetSteps: []
        }
    }
     componentDidUpdate(prevProps, prevState, snapshot){
         if(prevState.stepCount!=this.state.stepCount){
             console.log("Update StepCount")
             //TODO แสดงป๊อปอัพว่า ปลดคล๊อกอันใหม่
             this.update(this.state.stepCount)
         }

        if (this.props.fetchReducer.data.targetSteps!=null&&prevProps.fetchReducer.data.targetSteps!=null) {
         console.log(prevProps.fetchReducer.data.targetSteps.length + " / " + this.props.fetchReducer.data.targetSteps.length)
            if (prevProps.fetchReducer.data.targetSteps.length != this.props.fetchReducer.data.targetSteps.length) {
                console.log("Update targetSteps")
                this.setState({
                    ...this.props.fetchReducer.data,
                    prevLevel: { ...prevProps.authReducer.data.levelQ[this.state.type]
                    }
                })
                if (this.props.fetchReducer.data.isComplete) {
                    this.props.getQuestList(this.props.authReducer.data.uid, "undone");
                    this.props.updateQuestDone(this.props.authReducer.data, this.state.key, this.state.type);
                }
            }
        }
    } 
    componentDidMount() {
          this.timerID = setInterval(() => this._subscribe(), 1000);
      }


      componentWillUnmount() {
          clearInterval(this.timerID)
          this._unsubscribe();
      }

     _subscribe = () => {
         let startTime = new Date(this.props.fetchReducer.data.start.replace('Z', ''));
         let currentTime  = new Date();
        this._subscription = Pedometer.watchStepCount(result => {
                this.setState({
                time: new Date(),
            });
        });
/*           console.log("Start: "+startTime);
         console.log("current: "+currentTime);  */
         Pedometer.getStepCountAsync(startTime, currentTime).then(
             result => {
                // console.log(result.steps);
                
                    this.setState({
                      stepCount: result.steps||0
                 });  
             },
             error => {
                 this.setState({
                     stepCount: "Could not get stepCount: " + error
                 });
             }
         );
     };

    update = (steps) => {
             this.props.compareScore(this.props.fetchReducer.data,steps);
    }
     _unsubscribe = () => {
         this._subscription && this._subscription.remove();
         this._subscription = null;
     };

    render(){
        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel,targetSteps}=this.state;
        if (isComplete){   //Quest Complete
                    return(<View>
                    <Text>Current {type} star :{prevLevel.star}/{prevLevel.target}->{star}/{target}</Text>
                    <Text>level: {prevLevel.level}/{level}</Text>
                    <Text>Quest is Complete</Text>
                      <Button title="Go Home" 
                    onPress={()=>this.props.navigation.navigate('Home')}/>  
                    </View>
                    );
        }

        else{    //Quest Continue
            return(
            <View>
                <Text>QUEST</Text>
                    <Text>Name: {name} Type: {type}</Text>
                <Text>Detail: {detail} </Text>
                <Text>Exp: {current}/{target}</Text>
                    <Text>Steps : {this.state.stepCount}</Text>
                {   this.props.fetchReducer.data.targetSteps!=null &&
                    this.props.fetchReducer.data.targetSteps.map((obj,i) =><View key={i}>
                        <Text>You got more: {obj[0]}</Text>
                        <Text>Name: {obj[1].name}</Text>
                        <Text>Star: {obj[1].star}</Text>
                    </View>)
                }
            </View>
            );
        }
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList, compareScore
};
Expo.registerRootComponent(QuestWalk);
export default connect(mapStateToProps, mapDispatchToProps)(QuestWalk)