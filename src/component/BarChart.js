
import PureChart from 'react-native-pure-chart';
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class BarChart extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <View>
        <PureChart data={this.props.modalReducer.data.walkHistory} type='line'/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  modalReducer:state.modalReducer,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart)
