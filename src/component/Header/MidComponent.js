import React,{Component} from 'react';
import { StyleSheet,View,Text,Alert} from 'react-native';
import { connect } from 'react-redux';
import {Avatar,Badge} from 'react-native-elements';
import {fetchUser} from '../../actions/signIn';
import LeftComponent from './LeftComponent';


class MidComponent extends Component {
    constructor(props){
        super(props);
        this.easter9=this.easter9.bind(this);
       this.state={
           num:0
       }
    }



    easter9=()=>{
        if(this.state.num>=9){Alert.alert('BELIEVE!!!!!',
            'Nine9Belive',
            [
                {text: 'Press for Believe'},
            ],
            { cancelable: false });
        this.setState({num:0})}
        else{this.setState({num:this.state.num+1})}
    }

    render(){

        return(
                <View style={styles.container}>
                  <Badge onPress={() => {this.easter9()}} value="ACHIEVE" /> 
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    }
})


const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
    nav:state.nav
});
//Used to add dispatch (action) into props
const mapDispatchToProps={
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(MidComponent)