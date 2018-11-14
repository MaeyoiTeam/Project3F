import React,{Component} from 'react'
import {Text,View } from 'react-native'
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
            <View>
                <Text>Loading...</Text>
                <Text>Loading...</Text>
                <Text>Loading...</Text>
                <Text>Loading...</Text>
                <Text>Loading...</Text>
            </View>
        );
    }
}
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
