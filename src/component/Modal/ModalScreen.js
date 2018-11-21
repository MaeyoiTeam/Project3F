import React, { Component } from 'react'
import { View, Text ,Modal,Button} from 'react-native'
import { connect } from 'react-redux'
import {navigate} from '../../actions'
import {finishQuestWalk,clearFinishQuestWalk} from '../../actions/quest'
import { Pedometer } from "expo";
import * as Expo from "expo";
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
        this.props.finishQuestWalk(this.props.authReducer.data.uid,key[0],this.props.modalReducer.data,this.state.stepCount)
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

  render(){
    if(this.props.modalReducer.showModal){
    const {modalReducer,authReducer} = this.props
    const key = Object.keys(modalReducer.data)
    const data = Object.values(modalReducer.data);
    console.log(modalReducer.data)
    return (
     <Modal visible={this.props.modalReducer.showModal}
      onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       
       <Text>Date: {key[0]}</Text>
       <Text>Start at: {data[0].start}</Text>
       <Text>finish at: {data[0].last}</Text>
       <Text>Steps: {this.state.stepCount}</Text>
        <Button
          onPress={() => this.props.clearFinishQuestWalk(authReducer.data.uid).then(()=>this.props.navigate("Stack"))
          }
          title="Dismiss"
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
  questReducer: state.questReducer
})

const mapDispatchToProps = {
 navigate,finishQuestWalk,clearFinishQuestWalk
}
Expo.registerRootComponent(ModalScreen);
export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen)

