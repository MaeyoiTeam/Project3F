import { View,Text,StyleSheet,Image} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest,updateQuestDone,getQuestList} from '../../../actions/quest'
import TimerCountdown from 'react-native-timer-countdown';
import Accel from '../../../component/Accel';
class QuestRest extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Quest Rest"),
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
            isComplete:false,
            prevLevel:{},
            isPressed: false,
            accelerometerData: {},
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.fetchReducer.data!=this.props.fetchReducer.data){
            this.setState({
                ...this.props.fetchReducer.data,
                prevLevel: { ...prevProps.authReducer.data.levelQ[this.state.type]
                }
            })
             if (this.props.fetchReducer.data.isComplete) {
                 this.props.getQuestList(this.props.authReducer.data.uid, "undone");
                 this.props.updateQuestDone(this.props.authReducer.data,this.state.key,this.state.type);
             }
        }
    }


    update=(time)=>{
        console.log(time)
    }

    updateDone = (user, key, point) => {
            this.props.updateQuest(user, key, point)
    }
    toggleAlert=(toggle)=>{
         this.setState({isAlert: toggle});
    }


    render(){
        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel}=this.state;

        if (isComplete){   //Quest Complete
                    return(<View style = {{paddingTop:180}}>
                    <Text>Current {type} star :{prevLevel.star}/{prevLevel.target}->{star}/{target}</Text>
                    <Text>level: {prevLevel.level}/{level}</Text>
                    <Text>Quest is Complete</Text>
                      <Button title="Go Home"
                       buttonStyle={{
                        backgroundColor: "rgba(10, 10,100, 1)",
                        height:80,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        }} 
                    onPress={()=>this.props.navigation.navigate('Home')}/>  
                    </View>);
        }
        else{    //Quest Continue
            return(<View style={styles.contra}>
            <View style = {styles.A1}></View>
            <Image
                source={require('../../../../image/yoga.png')}
                fadeDuration={0}
                style={{width: 180, height: 180}}
                />
            
            <View style = {styles.kp3}></View>
                <View style = {styles.kp1}>
                
                    <Text style = {{textAlign: 'center',fontSize:30,fontFamily:'asd'}}>{name}</Text>
                <View style = {styles.kp2}></View>
                <Text style = {{textAlign: 'center',fontSize:22,fontFamily:'asd'}}>Detail: {detail} </Text>
                {   this.state.isPressed &&<View>
                <View style = {styles.kp5}></View>
                <TimerCountdown
                    initialSecondsRemaining={1000*(target-current)}
                     onTick={secondsRemaining => this.update(secondsRemaining)} 
                    onTimeElapsed={() => this.updateDone(authReducer.data,key,target)}
                    allowFontScaling={true}
                    style={{ fontSize: 30,textAlign:'center' ,fontFamily:'asd'}}
                />
                <Accel isAlert={this.toggleAlert}/>
                </View>
                }
                 <Text> </Text>
                 <Text> </Text>
                 <Text> </Text>
                {
                    this.state.isPressed ? <Button
                    title= "Reset Button"
                    buttonStyle={{
                        backgroundColor: "rgba(10, 10,100, 1)",
                        height:40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        }}
                    onPress={() => {
                        this.setState({ isPressed: false });
                    }}
                    textStyle={{fontFamily:'asd'}}
                    /> :                    
                    <Button
                    title="Start Button"
                    buttonStyle={{
                        backgroundColor: "rgba(10, 10,100, 1)",
                        height:40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        marginTop:20
                        }}
                        textStyle={{fontFamily:'asd'}}
                    onPress={() => {
                        this.setState({ isPressed: true });
                    }}
                    />
                }

                    
                </View>
                
            </View>
            );
        }
    }
}

styles = StyleSheet.create({
    A1:{
        alignItems:'center',
        flex: 0.3
    },
    contra:{
        flex:1,
        alignItems: 'center'
    },
    kp2:{
        flex:0
    },
    kp3:{
        flex:0.2,
    },
    kp4:{
        flex:0.1,
    },
    kp5:{
        flex:0.2,
    },
});

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestRest)