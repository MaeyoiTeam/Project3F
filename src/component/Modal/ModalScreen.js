import React, { Component } from 'react'
import { View, Text ,Modal,Button,Image,ScrollView,StyleSheet,FlatList} from 'react-native'
import { connect } from 'react-redux'
import {navigate} from '../../actions'
import {finishQuestWalk,clearFinishQuestWalk} from '../../actions/quest'
import { Pedometer,Notifications } from "expo";
import * as Expo from "expo";
import { updateNotification} from '../../actions/notification'


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
       const message = {
        title: "Walk Quest Completed!",
        body:"Steps: "+this.state.stepCount+" (+  stars).",  /* this.fetchReducer.data.star */
        date: new Date().toISOString()
     } 
      if (prevState.stepCount!=this.state.stepCount) {
        const key = Object.keys(this.props.modalReducer.data)
         this.props.finishQuestWalk(this.props.authReducer.data,key[0],this.props.modalReducer.data,this.state.stepCount) 
        this.props.updateNotification(this.props.authReducer.data.uid, message);
        this.sendSuccessQuestNotification(message);
      }
    }

    sendSuccessQuestNotification=(message)=>{
      Notifications.presentLocalNotificationAsync({
          title:  message.title,
          body:   message.body,
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
          //        console.log("Start: "+startTime);
          //       console.log("current: "+currentTime);  
         Pedometer.getStepCountAsync(startTime, currentTime).then(
           result => {
             // console.log(result.steps);
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


  render(){
    const {modalReducer,authReducer} = this.props
    if(this.props.modalReducer.showModal){
    return (
      
     <Modal visible={this.props.modalReducer.showModal}
      onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
          { modalReducer.showModal &&
             <View>
              <Text>Start at: {modalReducer.data.start}</Text>
              <Text>finish at: {modalReducer.data.last}</Text>
              <Text>star: {modalReducer.data.star}</Text> 
             </View> 
          }
          {
            
          }
       <Text>Steps: {this.state.stepCount}</Text>
        <Button
          onPress={() => this.props.clearFinishQuestWalk(authReducer.data).then(()=>this.props.navigate("Stack"))
          }
          title="Go to Home"
        />
        </View>
      </ScrollView>
     </Modal>
    )
    
    }
    else{
      return <View></View>
    }
  }
}



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


