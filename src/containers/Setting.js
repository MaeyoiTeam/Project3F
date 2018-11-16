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
            <View style={styles.container}>
            <View style={styles.pa1}></View>
            <View style={styles.pa2}>
                <Button title="Logout Account"
                    onPress={async ()=>{let path = await this.logOut();
                    this.props.navigation.navigate(path);
                    }}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 150,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 100  
                      }}/>
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center'
  },
  pa1: {
    backgroundColor: 'white', 
    flex: 0.2,
  },
    pa2: {
      backgroundColor: 'white', 
      flex: 0.4,
    },
});

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
