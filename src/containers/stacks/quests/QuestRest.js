import {View, Text, StyleSheet, Alert, Modal, TouchableOpacity, Platform,Image} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest,updateQuestDone,getQuestList} from '../../../actions/quest'
import {updateNotification} from '../../../actions/notification'
import TimerCountdown from 'react-native-timer-countdown';
import Accel from '../../../component/Accel';
import { Notifications} from 'expo'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
class QuestRest extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Rest"),
          titleStyle: {fontFamily:'asd'}
          
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
                const message = {
                    title: "Rest Quest Completed!",
                    body:"Quest: "+prevProps.fetchReducer.data.name+" (+ "+prevProps.fetchReducer.data.star+" stars).",
                    date: new Date().toISOString()
                 }
                 this.props.getQuestList(this.props.authReducer.data.uid, "undone");
                 this.props.updateQuestDone(this.props.authReducer.data,this.state.key,this.state.type);
                  this.props.updateNotification(this.props.authReducer.data.uid,message)
                 this.sendSuccessQuestNotification(message)
             }
        }
    }


    showNewAchievement=(data)=>{
        const achieves = Object.values(data);
            const message={
                title:'New Achievement',
                body:'You receive: '+achieves.length+ ' achievement',
            }
        this.sendSuccessQuestNotification(message);
        Alert.alert(
            message.title,
            message.body,
            [ 
              {text: 'OK'}  ,
            ],
            { cancelable: true }
          )
    } 

    update=(time)=>{
      //  console.log(time)
    }

    updateDone = (user, key, point) => {
            this.props.updateQuest(user, key, point)
    }
    toggleAlert=(toggle)=>{
         this.setState({isAlert: toggle});
    }

    sendSuccessQuestNotification = (message) => {
        if(this.props.authReducer.data.isShowNotification){
            if(message.icon==null){
                message.icon='https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1';
            }
            Notifications.presentLocalNotificationAsync({
                title:  message.title,
                body:   message.body,
                ios: {
                    sound: true
                },
                android: {
                    icon:   message.icon,
                    channelId: "achieve",
                    color: '#ADFFFF',
                }
            });
        }
    }


    render(){
        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel}=this.state;
        if(this.props.achievement.haveHISTORY){
            this.showNewAchievement(this.props.achievement.data)
        }
        if (isComplete){   //Quest Complete
                    return(
                    <View style = {styles.contra}>
                     <View style={styles.kl1}></View>
                     <Text style={{color:'black',fontFamily:'asd',fontSize:25}}>Quest is Complete</Text>
                     <View style={styles.kl3}></View>
                     <AnimatedCircularProgress
                        size={210}
                        width={90}
                        fill={star/target *100 }
                        tintColor="#32CD32"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        /* backgroundColor="#330066" */ >{
                          (fill) => (
                        
                            <Text style={{
                            fontFamily:'asd',
                            fontSize:40,
                            color:'#330066',
                            textAlign:'center', 
                            backgroundColor:'#DCDCDC',
                            borderRadius:360,
                            width:180,
                            height:180,
                            textAlignVertical:'center'}}>
                            Level : {level}
                            </Text>
                            
                          )
                        }
                        </AnimatedCircularProgress>
                        <View style={styles.kl1}></View>
                    <Text style={{color:'black',fontFamily:'asd',fontSize:25}}>EXP : {star}/{target}</Text>
                    {/* <Text style={{color:'white'}}>level: {prevLevel.level}/{level}</Text> */}
                    <View style={styles.kl1}></View>
                      <Button buttonStyle={{
                            backgroundColor: "#32CD32",
                            height:40,width:300,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius:360,
                            }} title={"Go Home"}  onPress={()=>this.props.navigation.navigate('Home')}/> 
                   
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
                <Text style = {{textAlign: 'center',fontSize:20,fontFamily:'asd'}}>Detail: {detail} </Text>
                <View style = {styles.kp6}></View>
                {   this.state.isPressed &&<View>
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
                {
                    !this.state.isPressed &&                    
                    <Button
                    title="Start"
                    buttonStyle={{
                        backgroundColor: "#32CD32",
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
        flex: 0.4
    },
    contra:{
        flex:1,
        alignItems: 'center'
    },
    kp2:{
        flex:0.1
    },
    kp3:{
        flex:0.05,
    },
    kp4:{
        flex:0.1,
    },
    kp5:{
        flex:0.05,
    },
    kp6:{
        flex:0.15,
    },
    contra:{
        flex:1,
        alignItems: 'center'
    },
    kl1:{
        flex:0.2,
    },
    kl3:{
        flex:0.15
     },
});

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    achievement: state.historyReducer,
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList, updateNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestRest)