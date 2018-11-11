import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import {signOut} from '../actions/signIn';
class Setting extends Component {
    static navigationOptions = () => ({
 
  });



     logOut = () => {
         return new Promise(async (resolve, reject) => {
             this.props.signOut()
            return resolve("SignIn")
         })
     }

    render(){
        return(
            <View>
                <Text>This is Setting</Text>
                <Button title="Logout Account" 
                    onPress={async ()=>{let path = await this.logOut();
                    this.props.navigation.navigate(path);
                    }}
                />
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
    signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting)