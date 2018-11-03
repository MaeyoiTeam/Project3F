import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';


class Profile extends Component{



    render(){
        const {authReducer} = this.props
        return <View>
            <Text>Your Profile</Text>
            {authReducer.isAuth && <View>
                <Avatar xlarge rounded source={{ uri: authReducer.data.photoURL }} onPress={() => console.log("Works!")} />
                <Text>{authReducer.data.displayName}</Text>
                <Text>{authReducer.data.Email}</Text>
                {authReducer.data.levelQ!=null &&
                    Object.keys(authReducer.data.levelQ).map((key, index)=> <Text key={index}>{key} level: {authReducer.data.levelQ[key]}</Text>)
                } 
              </View>}
          </View>;
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)