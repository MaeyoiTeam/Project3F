import React,{Component} from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {fetchUser} from '../../actions/signIn';
import {
    Header,
    Button
} from 'react-native-elements';
import LeftComponent from './LeftComponent';
class HeaderComponent extends Component{
    render(){
        return(
<Header 
            leftComponent={<LeftComponent />}
            centerComponent={{ text: 'Project3F', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)