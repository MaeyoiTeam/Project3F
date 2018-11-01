import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import SignIn from './component/SignIn'
import Ranking from './component/Ranking'



export const Navigator = new StackNavigator({
  SignIn: {
    screen: SignIn
  },
  Ranking: {
    screen: Ranking
  },
},{
  initialRouteName: 'SignIn',
})

class Nav extends Component {
  render() {

    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })} />
    )
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
})
export default connect(mapStateToProps)(Nav)