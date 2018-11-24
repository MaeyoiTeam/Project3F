import { View, Text, StyleSheet, FlatList,Image,TouchableOpacity,ActivityIndicator,Dimensions,Modal } from 'react-native';
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button,Badge} from 'react-native-elements'
import { Pedometer } from "expo";
import {updateQuest,fetchQuest,updateQuestDone,getQuestList,compareScore} from '../../../actions/quest';
import * as Expo from "expo";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Tails from '../../../component/Tails';
class QuestWalk extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Walk"),
      };
  };
    constructor(props){
        super(props);

        this.state={
            showMe: false,
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
            targetSteps: [],
            count:0,
            
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this._subscribe(), 1000);
    }

    componentWillReceiveProps = (nextProps) => {
      this.setState({targetSteps:nextProps.fetchReducer.data.targetSteps})
    }
    
      shouldComponentUpdate = (nextProps, nextState) => {
      return this.props.fetchReducer.data.targetSteps!=nextProps.fetchReducer.data.targetSteps||this.state.stepCount!=nextState.stepCount||this.state.showMe!=nextState.showMe;
    }  
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.stepCount != this.state.stepCount) {
          console.log("Update StepCount");
          //TODO แสดงป๊อปอัพว่า ปลดคล๊อกอันใหม่
          this.update(this.state.stepCount);
        }
    }
     openAboutUs=()=>{
        this.setState({
            showMe:true
        })
     } 
     closeAboutUs=()=>{
        this.setState({
            showMe:false
        })
     }


      componentWillUnmount() {
          clearInterval(this.timerID)
          this._unsubscribe();
      }

     _subscribe = () => {
         let startTime = new Date(this.props.fetchReducer.data.start.replace('Z', ''));
         let currentTime  = new Date();
        this._subscription = Pedometer.watchStepCount((result)=>{
            this.setState({count:result})
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

    update =async (steps) => {
             await this.props.compareScore(this.props.fetchReducer.data,steps);
    }
     _unsubscribe = () => {
         this._subscription && this._subscription.remove();
         this._subscription = null;
    };

    chooseColor=()=>{
        if(Array.isArray(this.props.fetchReducer.data.targetSteps)){
            const target = this.props.fetchReducer.data.targetSteps[this.props.fetchReducer.data.targetSteps.length-1];
            console.log(target[1].color)
            return target[1].color;
        }
        return "#FF3333";
    }

    chooseTarget=()=>{
        let target =0
            if(Array.isArray(this.props.fetchReducer.data.targetSteps)){
                switch (this.props.fetchReducer.data.targetSteps.length) {
                    case 0: target=200;     break;
                    case 1: target=400;     break;
                    case 2: target=999;     break;
                    case 3: target=2018;    break;
                    default:  target=200;   break;
                }
            }
            else{
                target=200;
            }
            let result = this.state.stepCount/target*100;
        return result
    }

    render(){
        const {fetchReducer} = this.props;
        const {type,target,star,level,isComplete,prevLevel}=this.state;
            return (<View style={styles.container}>
<View style={styles.title}></View>

<AnimatedCircularProgress size={210} width={90} fill={this.chooseTarget()} tintColor={this.chooseColor()} onAnimationComplete={() => console.log('onAnimationComplete')}
  /* backgroundColor="#330066" */ >{
    (fill) => (
     /*  <Text >
        {this.state.stepCount}
      </Text> */
      <Image
                 source={require('../../../../image/steps.png')}
                 style={{width: 180, height: 180}}
                />
    )
  }
  </AnimatedCircularProgress>
  <View style={styles.ki}></View>
  
                    <Badge containerStyle={{ backgroundColor: 'transparent',width:300,}} textStyle={{fontFamily:'asd',fontSize:30, color: '#000000'}} value={"Steps : "+this.state.stepCount}/>
                     {   /* fetchReducer.data.targetSteps!=null &&
                        <FlatList data={fetchReducer.data.targetSteps} 
                        renderItem={({item})=><Text>{item[0]}</Text>}/> */
                    }   
                <View style={styles.ki1}></View>
                    <Text style={{fontFamily:'asd',fontSize:20}}>Star : 11 </Text> 
                    <View style = {styles.separator}></View>
            <View style={styles.container1}>
                            <Tails showMe={this.state.showMe} closeAboutUs={this.closeAboutUs}/>
                            <View style={styles.ki9}></View>
                            <Badge onPress={this.openAboutUs} containerStyle={{ backgroundColor: '#330066',width:125}} textStyle={{fontFamily:'asd',fontSize:18, color: '#ffffff'}} value={'Detail'} />
                           
             
                            </View>  
            </View>);
        }
    }
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex:1
    },
    title: {
      flex:0.2
    },
    ki:{
        flex:0.1
    },
    ki1:{flex:0.3,
         
    },
   
        modalView1:{
            flex:0.4
             }, 
        modalView:{backgroundColor:'#fff',
                height:500,
                width: 320,
                justifyContent:'center',
                alignItems:'center',
                alignSelf: 'center'
            },
        closeText:{backgroundColor:'#333',
                color:'#bbb',
                padding:5,
                margin:20,
                fontFamily:'asd'
            }, 
        separator:{
                marginVertical: 10,
                borderWidth: 1,
                width:150,
                borderColor: '#BEBEBE',
            } 
       
    });
 
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList, compareScore
};
Expo.registerRootComponent(QuestWalk);
export default connect(mapStateToProps, mapDispatchToProps)(QuestWalk)