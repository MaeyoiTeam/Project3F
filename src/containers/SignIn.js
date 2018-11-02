import React, { Component } from 'react';
import {  View, Text } from 'react-native';
import { connect } from 'react-redux';
import {signOut,signInWithFacebook,signInWithGoogle,fetchUser} from '../actions/signIn';
import {Button,Avatar} from 'react-native-elements';

class SingIn extends Component{
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', 'Sign in'),
      };
  };

     componentWillMount() {
         this.props.fetchUser();
     }

     componentDidUpdate = (prevProps, prevState) => {
       return props.authReducer.isAuth;
     };
     

     render() {
      props=this.props;
      if(props.authReducer.isAuth){
          return (
        <View>
        <Button title="Logout" onPress={props.signOut}/>
        {
    props.authReducer.data!= null && <View>
        <Text>{props.authReducer.data.displayName}</Text>
            <Text>{props.authReducer.data.email}</Text>
                <Avatar
                    size="small"
                    rounded
                    source={{ uri: props.authReducer.data.photoURL }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                 <Button title="GO Profile" onPress={()=>this.props.navigation.navigate("Profile2")}/>
        </View>  }
      </View>
    );
      }
      else{
          return(
              <View>
        <Button title="Login With Facebook" onPress={props.signInWithFacebook}/>
        <Button title="Login With Google" onPress={props.signInWithGoogle}/>
    
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
 signInWithFacebook, signInWithGoogle, signOut, fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SingIn)
