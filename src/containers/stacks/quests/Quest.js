import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, Platform,Image} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest,updateQuestDone,getQuestList} from '../../../actions/quest'
import {updateNotification} from '../../../actions/notification'
import { Notifications} from 'expo';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {clearFechReducer,clearMiddleHistory} from '../../../actions/'
class Quest extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Food"),
      };
  };
    constructor(props){
        super(props);
        this.update = this.update.bind(this);
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
            showMe:false
        }
    }

    componentDidMount(){
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync("achieve", {
                name: "Achieve",
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
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
                    title: "Food Quest Completed!",
                    body:"Quest: "+prevProps.fetchReducer.data.name+" (+ "+prevProps.fetchReducer.data.star+" stars).",
                    date: new Date().toISOString()
                    
                 }
                 this.props.getQuestList(this.props.authReducer.data.uid, "undone");
                 this.props.updateQuestDone(this.props.authReducer.data,this.state.key,this.state.type);
                 this.props.updateNotification(this.props.authReducer.data.uid, message)
                 this.sendSuccessQuestNotification(message);
             }
        }
    } 

    sendSuccessQuestNotification=(message)=>{
        if(this.props.authReducer.data.isShowNotification){
            if(message.icon==null){
                message.icon='https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1';
            }
            Notifications.presentLocalNotificationAsync({
                title:  message.title,
                body:   message.body,
                ios:{
                    sound:true
                },
                android: {
                    icon: message.icon,
                    channelId: "achieve",
                    color: '#FF0000',
                }
            });
        }
    }
    
    update(){
        let sumPoint = this.state.current+this.state.point;
        this.props.updateQuest(this.props.authReducer.data, this.state.key, sumPoint);
    }
    
     showNewAchievement=(data)=>{
        const achieves = Object.values(data);
            const message={
                title:'New Achievement',
                body:'You receive: '+achieves.length+ ' achievement',
            }
            for(achieve of achieves){
                this.props.updateNotification(this.props.authReducer.data.uid, {title:message.title,
                body:'You receive : '+achieve.name+'    ( +'+achieve.star+' stars)'
                })
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

    componentWillUnmount(){
        this.props.clearFechReducer();
        this.props.clearMiddleHistory();
    }



    render(){
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel}=this.state;
        const {authReducer} =this.props;
        if(this.props.achievement.haveHISTORY){
            this.showNewAchievement(this.props.achievement.data)
        } 
        if (isComplete){                                            //Quest Complete
                     return(<View style = {styles.contra}>
                     <View style={styles.kl1}></View>
                     <Text style={{color:'black',fontFamily:'asd',fontSize:25}}>Quest is Complete</Text>
                     <View style={styles.kl3}></View>
                     <AnimatedCircularProgress
                        size={210}
                        width={90}
                        fill={star/target *100 }
                        tintColor="#FF6347"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#000000">{
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
                            backgroundColor: "#FF6347",
                            height:40,width:300,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius:360,
                            }} title={"Go Home"}  onPress={()=>this.props.navigation.navigate('Home')}/> 
                   
                    </View>); 
        }
        else{    //Quest Continue
            return(  <View style={styles.contra}>
            <View style={styles.kl1}></View>
            <Image
                source={require('../../../../image/food2.png')}
                style={{width: 180, height: 180}}
                />
                
            <View style={styles.modalView1}></View>
                    <Text style = {{textAlign: 'center',fontSize:30,fontFamily:'asd'}}>{name} </Text>
                <Text style = {{textAlign: 'center',fontSize:20,fontFamily:'asd'}}>Detail: {detail} </Text>
             
                <View style={styles.kl1}></View>
                <Text style = {{textAlign: 'center',fontSize:15,fontFamily:'asd'}}>Finished: {current}/{target}</Text>
                  
                            <View style={styles.modalView}></View>
                
                  <Button buttonStyle={{
                                    backgroundColor: "#FF6347",
                                    height:40,width:300,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius:360,
                                    }} title={"Submit"} onPress={()=>this.update(authReducer.data,key,point)}/> 
        
        </View>);
        }
    }
}

const styles = StyleSheet.create({
modalView1:{
    flex:0.2,
 },
modalView:{
   alignItems:'center' ,
   flex:0.05
},
contra:{
    flex:1,
    alignItems: 'center'
},
kl1:{
    flex:0.2,
},
kl2:{
    flex:0.2
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
    updateQuest, fetchQuest, updateQuestDone, getQuestList, updateNotification,clearFechReducer,clearMiddleHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)