import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Button,Avatar} from 'react-native-elements';
import firebase from '../config/firebase';
import {upScore,fetchRanking} from '../actions';
import { connect } from 'react-redux';

class AddData extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    render(){
        if(this.props.authReducer.isAuth){
        return(
            <View>
            <Button
            title = 'Plus 10' onPress={()=>{
                this.props.upScore(this.props.authReducer.data.uid,10)
                }}/>
            </View>
        );}
        else{
            return(<View><Text>AddData: Please Login</Text></View>);
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
        upScore, fetchRanking
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData)