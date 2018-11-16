import React,{Component} from 'react'
import {Text,View,StyleSheet,AppRegistry,ProgressBarAndroid } from 'react-native'
import { connect } from 'react-redux';
import {signOut,signInWithFacebook,signInWithGoogle,authChanged} from '../../actions/signIn';
import {Button,Avatar} from 'react-native-elements';

class Loading extends Component{
     componentWillMount() {
         this.props.authChanged();
     }
     componentDidUpdate = (prevProps, prevState) => {
         if (this.props.authReducer.isAuth) {
             this.props.navigation.navigate('Stack')
         }
         else{
             this.props.navigation.navigate('SingIn')
         }
     };
    render(){
        return(
            <View style={styles.container}>
               <ProgressBarAndroid
          styleAttr="Large"
          indeterminate={true}
        />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      padding: 10
    }
  });
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    signInWithFacebook,
    signInWithGoogle,
    signOut,
    authChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
