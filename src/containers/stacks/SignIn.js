import React, { Component } from 'react';
import {  View, Text ,StyleSheet,ImageBackground,Image } from 'react-native';
import { connect } from 'react-redux';
import {signOut,signInWithFacebook,signInWithGoogle,authChanged} from '../../actions/signIn';
import {Button,Avatar,colors} from 'react-native-elements';
import { SocialIcon } from 'react-native-elements'
import FirstPage from '../../containers/stacks/FirstPage'
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
      if(props.authReducer.isAuth){         //Should be FirstPage
          return (
         
          
        <View>
                  <FirstPage/>
      </View>
    );
      }
      else{
          return(
              
        
       
          <ImageBackground source={require('../../../image/k1.png')}style={Styles.container}>
        <View style={Styles.ki1}></View>
         <View style={Styles.ki2}>
         <Image 
                 source={require('../../../image/logosignin.png')}
                 fadeDuration={0}
                 style={{width: 220, height: 220,alignItems:'center'}}
                />
        </View>
        <View style={Styles.ki5}></View>
        <View style={Styles.ki3}>
        <Text style = {{fontFamily:'asd',fontSize:15}}>Login via</Text>
        </View> 
        
        <View style={Styles.ki4}>
        <SocialIcon
        onPress={this.props.signInWithFacebook}
        title='Sign In With Facebook'
        button
        type='facebook'
        style={{height:35,width:300}}
        />
        </View>
        
        <SocialIcon
        onPress={this.props.signInWithGoogle}
        title='Sign In With Google'
        button
        type='google-plus-official'
        style={{height:35,width:300}}
        />
    
      
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
        flex: 0.05,
        
      },
    ki2: {
        flex: 0.2,
      },
    ki1: {
        flex: 0.13,   
      },
    ki4:{
        
        flex: 0.10,
    },
    ki5:{

        flex: 0.30,
    },
   
});

export default connect(mapStateToProps, mapDispatchToProps)(SingIn)
