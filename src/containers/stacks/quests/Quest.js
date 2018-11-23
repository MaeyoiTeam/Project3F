import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, Platform,Image} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest,updateQuestDone,getQuestList} from '../../../actions/quest'
import {updateNotification} from '../../../actions/notification'
import { BlurView, Notifications} from 'expo';

class Quest extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Quest"),
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
                     name: "Food Quest Success", newStar: prevProps.fetchReducer.data.star, currentStar: this.props.fetchReducer.data.star, date: new Date().toISOString()
                 }
                 this.props.getQuestList(this.props.authReducer.data.uid, "undone");
                 this.props.updateQuestDone(this.props.authReducer.data,this.state.key,this.state.type);
                 this.props.updateNotification(this.props.authReducer.data.uid, message)
                 this.sendSuccessQuestNotification(message);
                 this.decisionQuest();
             }
        }
    } 

    sendSuccessQuestNotification=(message)=>{
        Notifications.presentLocalNotificationAsync({
            title: message.name,
            body: "Star: " + message.currentStar + " ( +" + message.newStar+").",
            ios:{
                sound:true
            },
            android: {
                icon: 'https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1',
                channelId: "achieve",
                color: '#FF0000',
            }
        });
    }
    
    update(){
        let sumPoint = this.state.current+this.state.point;
        this.props.updateQuest(this.props.authReducer.data, this.state.key, sumPoint);
    }
    
    decisionQuest=()=>{
        Alert.alert(
            'Food Quest Completed',
            'Start: '+this.state.star+' / '+this.state.target+'Level: '+
            this.state.prevLevel.level+' => '+this.state.level,
            [ 
              {text: 'OK',  onPress:()=>this.props.navigation.navigate('Home')}  ,
            ],
            { cancelable: false }
          )
    }




    render(){
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel}=this.state;
        const {authReducer} =this.props;
        if (isComplete){ 
            this.decisionQuest();                                           //Quest Complete
                     return(
                    <View style = {{paddingTop:180,alignItems:'center'}}>
                    <Text style={{color:'white'}}>Current {type} star :{prevLevel.star}/{prevLevel.target}->{star}/{target}</Text>
                    <Text style={{color:'white'}}>level: {prevLevel.level}/{level}</Text>
                    <Text style={{color:'white'}}>Quest is Complete</Text>
                      <Button title="Go Home"
                      buttonStyle={{
                        backgroundColor: "white",
                        height:20,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        }}
                    onPress={()=>this.props.navigation.navigate('Home')}/>  
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
                                    backgroundColor: "rgba(10, 10,100, 1)",
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
}
});
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList, updateNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)