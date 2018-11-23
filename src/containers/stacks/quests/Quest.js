import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, Platform} from 'react-native';
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
            'Alert Title',
            'My Alert Msg',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }




    render(){
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
            return(    
            <View>
                
                <View style = {{paddingTop:180}}>
                    <Text style = {{textAlign: 'center',fontSize:15}}>{name} Type: {type}</Text>
                <Text style = {{textAlign: 'center',fontSize:15}}>Detail: {detail} </Text>
                <Text style = {{textAlign: 'center',fontSize:15}}>Finished: {current}/{target}</Text>
                
                <Modal visible={this.state.showMe}
                            onRequestClose={()=>console.warn("this is cloase request")}
                            animationType='fade' transparent  >
                            <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill}></BlurView>
                            <View style={styles.modalView1}></View>
                            <View style={styles.modalView}>
                 <Text>กดเพื่อรับดวงดาวกันเลยยยยยย</Text>
                 <View style={styles.modalView}></View>
                  <Button buttonStyle={{
                                    backgroundColor: "rgba(10, 10,100, 1)",
                                    height:30,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius:360,
                                    }} title={"Up "+point+" point"} onPress={this.update}/> 
                 <TouchableOpacity onPress={()=>{this.setState({
                                showMe:false
                            })}}>
                                <Text style={styles.closeText}>ถ้ายังทำไม่ครบก็กดออกก่อนนะ^^</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>

                            <TouchableOpacity onPress={()=>{this.setState({
                                showMe:true
                            })}}>
             <Text style={styles.openText}>ถ้าคิดว่าทำแล้วก็กดเลย!!</Text>
        </TouchableOpacity>
        
        </View>
        </View>
            );
        }
    }
}

const styles = StyleSheet.create({
modalView1:{
    flex:0.4,
 },
modalView:{backgroundColor:'#fff',
   height:290,
   width: 320,
   justifyContent:'center',
   alignItems:'center',
   alignSelf: 'center'
},
closeText:{backgroundColor:'#333',
   color:'#bbb',
   padding:5,
   margin:20,
}, 
openText:{backgroundColor:'#bbb',
   color:'black',
   padding:5,
   margin:20,
   borderWidth: 1,          
},
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