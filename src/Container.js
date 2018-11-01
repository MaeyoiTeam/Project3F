import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Ranking from './component/Ranking';
import SignIn from './component/SignIn';
import AddData from './component/AddData';
import {Button} from 'react-native-elements';
import {fetchUser} from './actions/signIn';

class Container extends Component {
  render() {
      props=this.props;
    return (
        <View>
        <Text>Home Screen</Text>
        <Button title="GO SignIn" onPress={()=>this.props.navigation.navigate('Profile')}/>
            </View>
        );   
}
}

const mapStateToProps = (state) => ({
    fetchReducer:state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps={
 fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Container)



