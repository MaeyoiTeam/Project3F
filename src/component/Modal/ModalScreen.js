import React, { Component } from 'react'
import { View, Text ,Modal,Image,ScrollView,StyleSheet,FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import { connect } from 'react-redux'
import {navigate} from '../../actions'
import {finishQuestWalk,clearFinishQuestWalk} from '../../actions/quest'
import { Pedometer,Notifications } from "expo";
import * as Expo from "expo";
import {updateNotification} from '../../actions/notification'
 const moment = require("moment"); 


export class ModalScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       stepCount:0,
    };
  
  }
    componentWillMount(){
           this._subscribe();
    }
    componentDidUpdate(prevProps, prevState){
     
      if (prevState.stepCount!=this.state.stepCount) {
        const key = Object.keys(this.props.modalReducer.data)
        this.finishQuest(this.props.authReducer.data, key[0], this.props.modalReducer.data, this.state.stepCount);
        
      }
      if(this.props.modalReducer.data.star!=undefined){
        const message = {
          title: "Walk Quest Completed!",
          body:"Steps: "+this.state.stepCount+" (+ "+this.props.modalReducer.data.star+" stars).",
          date: new Date().toISOString()
       } 
       this.props.updateNotification(this.props.authReducer.data.uid, message);
        this.sendSuccessQuestNotification(message);
      }
    }

    finishQuest=async (auth,key,modal,step)=>{
      await this.props.finishQuestWalk(auth, key, modal, step)
    await this.props.clearFinishQuestWalk(auth);
    }


    sendSuccessQuestNotification=(message)=>{
     if(this.props.authReducer.data.isShowNotification){
       Notifications.presentLocalNotificationAsync({
         title: message.title,
         body: message.body,
         ios: {
           sound: true
         },
         android: {
           icon: 'https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1',
           channelId: "achieve",
           color: '#FF0000',
         }
       });
     }
  }

        _subscribe = () => {
          if (this.props.modalReducer.showModal) {
        const data = Object.values(this.props.modalReducer.data);
         let startTime = new Date(data[0].start.replace('Z', ''));
         let currentTime = new Date(data[0].last.replace('Z', ''));
         this._subscription = Pedometer.watchStepCount(result => {
           this.setState({
             time: new Date(),
           });
         });
         Pedometer.getStepCountAsync(startTime, currentTime).then(
           result => {
             this.setState({
               stepCount: result.steps || 0
             });
           },
           error => {
             this.setState({
               stepCount: 0
             });
           }
         );
       }
    };  

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  componentWillUnmount() {
    clearInterval(this.timerID)
    this._unsubscribe();
  }

   changeTextDate=(date,type)=>{
     if (date){
       switch (type) {
         case 'day': return moment(date).format('LL')
         case 'time': return moment(date).format('LT')
         default: return moment(date).format("LT");
       }
    }
    return "wait"
  }
  


  render(){
    const {modalReducer,authReducer} = this.props
    if(this.props.modalReducer.showModal){
    return <Modal visible={this.props.modalReducer.showModal} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
        <View style={styles.container1}>
          <View style={styles.container2} />
          <Image source={require("../../../image/end.jpg")} fadeDuration={0} style={{ width: 180, height: 180, alignItems: "center" }} />
          <View style={styles.container4} />
          {modalReducer.showModal && <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "asd", fontSize: 25 }}>
                Date : {this.changeTextDate(modalReducer.data.start,'day')}
              </Text>
              <Text style={{ fontFamily: "asd", fontSize: 20 }}>
            Time :{this.changeTextDate(modalReducer.data.start, 'time')} to {this.changeTextDate(modalReducer.data.last,'time')}
              </Text>
              <Text style={{ fontFamily: "asd", fontSize: 25 }}>
                Star : {modalReducer.data.star}
              </Text>
            </View>}
          <Text
            style={{ fontFamily: "asd", fontSize: 25, textAlign: "center" }}
          >
            Steps : {this.state.stepCount}
          </Text>
          <View style={styles.container2} />
          <Text style={{ fontFamily: "asd", fontSize: 10 }}>
            Detail : This page is a summary of walking results in a day
          </Text>
          <View style={styles.container3} />
          <Button buttonStyle={{ backgroundColor: "lightblue", height: 40, width: 250, borderColor: "transparent", borderRadius: 360 }} title="Go to Home" style={{ fontFamily: "asd" }} onPress={() => () => this.props.navigate("Stack")} />
        </View>
      </Modal>;
    
    }
    else{
      return <View></View>
    }
  }
}

const styles = StyleSheet.create({
  
  container1: {
    flex:1,
    alignItems:'center'
  },
  container2: {
    flex:0.2
  },
  container3: {
    flex:0.02
  },
  container4: {
    flex:0.1
  },
});

const mapStateToProps = (state) => ({
/*   fetchReducer: state.fetchReducer, */
  authReducer: state.authReducer,
  modalReducer: state.modalReducer,
})

const mapDispatchToProps = {
 navigate,finishQuestWalk,clearFinishQuestWalk,updateNotification
}
Expo.registerRootComponent(ModalScreen);
export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen)


