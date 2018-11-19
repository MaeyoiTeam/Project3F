import React, { Component } from 'react'
import { View, Text ,Modal,Button} from 'react-native'
import { connect } from 'react-redux'
import {navigate} from '../../actions'
export class ModalScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    };
  }
  
  render() {
    return (
     <Modal visible={this.props.modalReducer.showMoadl}
      onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigate("Loading")}
          title="Dismiss"
        />
      </View>
     </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  modalReducer: state.modalReducer,
  questReducer: state.questReducer
})

const mapDispatchToProps = {
 navigate
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen)


