import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export class FinishDate extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    };
  }
  
  render() {
    console.log(this.props.questReducer.data)
    return (
      <View>
        <Text> prop </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
   questReducer: state.questReducer
})

const mapDispatchToProps = {
 
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishDate)
