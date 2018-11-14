import React, { Component } from 'react';
import {  View, Text ,StyleSheet,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {signOut,signInWithFacebook,signInWithGoogle,authChanged} from '../../actions/signIn';
import {Button,Avatar,colors} from 'react-native-elements';

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
              
        
       
          <ImageBackground source={require('../../../image/k1.png')}style={Styles.container}>
        <View style={Styles.ki1}></View>
         <View style={Styles.ki2}>
            <Text>ACHIVE</Text>
        <Text>4YOURSELF</Text> 
        </View>
        <View style={Styles.ki3}>
        <Text>Logun via</Text>
        </View> 
        <View style={Styles.ki4}>
        <Button  title="Login With Facebook" onPress={this.props.signInWithFacebook}

        buttonStyle={{
            backgroundColor: "pink",
            width: 100,
            height: 100,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 360   
        }}/>
        </View>
        
        <Button title="Login With Google" onPress={this.props.signInWithGoogle}
        buttonStyle={{
            backgroundColor: "pink",
            width: 100,
            height: 100,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 360,
        }}/>
    
      
  </ImageBackground>
  
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
const Styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center'
      },
    ki3: {
        flex: 0.12,
        
      },
    ki2: {
        flex: 0.2,
      },
    ki1: {
        flex: 0.25,   
      },
    ki4:{
        
        flex: 0.3,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingIn)
