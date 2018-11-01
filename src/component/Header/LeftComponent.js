import React,{Component} from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {fetchUser} from '../../actions/signIn';
import {Header} from 'react-native-elements';
class LeftComponent extends Component{
         componentWillMount() {
             this.props.fetchUser();
         }
render(){
    return(
        <View>
        {this.props.authReducer.isAuth && <Avatar
                    size = "small"
                    rounded
                    source={{ uri: this.props.authReducer.data.photoURL }}
                      activeOpacity={0}
                   onPress={()=>{
                       NavigationService.navigate("Profile",{})
                   }}
                />}
        </View>
    );
}
}


const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps={
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftComponent)