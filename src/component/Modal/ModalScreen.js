import React, { Component } from 'react'
import { View, Text ,Modal,Button,Image} from 'react-native'
import { connect } from 'react-redux'
import {navigate} from '../../actions'
import {finishQuestWalk,clearFinishQuestWalk} from '../../actions/quest'
import { Pedometer } from "expo";
import * as Expo from "expo";
import { updateNotification} from '../../actions/notification'
export class ModalScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       stepCount:0
    };
  }
    componentWillMount(){
           this._subscribe();
    }
    componentDidUpdate(prevProps, prevState){
      if (prevState.stepCount!=this.state.stepCount) {
        const key = Object.keys(this.props.modalReducer.data)
        this.props.finishQuestWalk(this.props.authReducer.data,key[0],this.props.modalReducer.data,this.state.stepCount)
        this.props.updateNotification(this.props.authReducer.data.uid, {
          name:"steps: "+this.state.stepCount+" Walk Quest Success walk", date: new Date().toISOString()
        }) 
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
               stepCount: "Could not get stepCount: " + error
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
    if(this.props.modalReducer.showModal){
    const {modalReducer,authReducer} = this.props
    const key = Object.keys(modalReducer.data)
      const data = modalReducer.data[key[2]];
    console.log(modalReducer.data.achievement)
   // console.log(modalReducer.data)
    return (
     <Modal visible={this.props.modalReducer.showModal}
      onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
         modalReducer.data.achievement!=null &&
         Object.values(modalReducer.data.achievement).map((obj,i) => <View key={i}>
                            <Text>Name: {obj.name}</Text>
                            <Text>Detail: {obj.detail}</Text>
                            <Text>Time: {obj.time}</Text>
                            <Text>star: {obj.star}</Text>
                            <Text> </Text>
                        </View>
                        )
       } 
       <Text>Date: {key[2]}</Text>
          { data!=null &&
             <View>
              <Text>Start at: {data.start}</Text>
              <Text>finish at: {data.last}</Text> 
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
        {
          Object.entries(authReducer.data.walkStacks).map((obj,i)=>
            <Text key={i}>{obj[0]} : {obj[1]}</Text>
          )
        }
        { modalReducer.data.walkStacks!=null &&
          Object.entries(modalReducer.data.walkStacks).map((obj, i) =>
            <Text key={i}>{obj[0]} : {obj[1]}</Text>
          )
        }
        
      </View>
     </Modal>
    )
    }
    else{
      return <View></View>
    }
  }

  }

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  modalReducer: state.modalReducer,
  questReducer: state.questReducer,
})

const mapDispatchToProps = {
 navigate,finishQuestWalk,clearFinishQuestWalk,updateNotification
}
Expo.registerRootComponent(ModalScreen);
export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen)


