import React, { Component } from 'react';
import {  View, Text ,StyleSheet,ImageBackground } from 'react-native';
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
            <Text style = {{fontFamily:'asd',fontSize:30,fontWeight:'bold'}}>    ACHIVE</Text>
        <Text style = {{fontFamily:'asd',fontSize:30,fontWeight:'bold'}}>4YOURSELF</Text> 
        </View>
        <View style={Styles.ki3}>
        <Text style = {{fontFamily:'asd',fontSize:25,fontWeight:'bold'}}>Login via</Text>
        </View> 
        <View style={Styles.ki4}>
        <SocialIcon onPress={this.props.signInWithFacebook}
        type='facebook'
        style={{width: 100, height: 100, borderRadius: 100}}
        iconSize={70}
      />
        </View>
        
        <SocialIcon onPress={this.props.signInWithGoogle}
        type='google-plus-official'
        style={{width: 100, height: 100, borderRadius: 100, backgroundColor:'white'}}
        iconSize={100}
        iconColor='red'
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
