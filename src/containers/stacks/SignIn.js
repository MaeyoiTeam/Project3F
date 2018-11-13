import React, { Component } from 'react';
import {  View, Text } from 'react-native';
import { connect } from 'react-redux';
import {signOut,signInWithFacebook,signInWithGoogle,authChanged} from '../../actions/signIn';
import {Button,Avatar} from 'react-native-elements';

class SingIn extends Component{
  static navigationOptions = ({
      navigation
  }) => {
      return {
          header: null,
        //  title: navigation.getParam('otherParam', 'Switch Account'),
      };
  };

     componentWillMount() {
         this.props.authChanged();
     }

     componentDidUpdate = (prevProps, prevState) => {
         if(this.props.authReducer.isAuth){
             this.props.navigation.navigate('Home')
         }
     };
     

     render() {
      props=this.props;
      if(props.authReducer.isAuth){         //Should be Loading
          return (
        <View>
                  {
                      props.authReducer.data != null && <View>
                          <Text>{props.authReducer.data.displayName}</Text>
                          <Text>{props.authReducer.data.email}</Text>
                          <Avatar
                              xlarge
                              rounded
                              source={{ uri: props.authReducer.data.photoURL }}
                              onPress={() => console.log("Works!")}
                              activeOpacity={0.7}
                          />
                      </View>}
      </View>
    );
      }
      else{
          return(
              <View>
        <Button title="Login With Facebook" onPress={this.props.signInWithFacebook}/>
        <Button title="Login With Google" onPress={this.props.signInWithGoogle}/>
      </View>
          );
      }
    
  }
}
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer:state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps={
 signInWithFacebook, signInWithGoogle, signOut, authChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(SingIn)
