import React,{Component} from 'react'
import {Text,View,Platform } from 'react-native'
import { connect } from 'react-redux';
import {authChanged} from '../../actions/signIn';
import {getQuestList} from '../../actions/quest';
import Loading from '../../component/Loading';

class FirstPage extends Component {
     componentWillMount() {
         this.props.authChanged();
         
     }
     componentDidUpdate = (prevProps, prevState) => {
         if (this.props.authReducer.isAuth) {
             this.props.getQuestList(this.props.authReducer.data.uid, "over")
             this.props.navigation.navigate('Stack')
         }
         else{
             this.props.navigation.navigate('SingIn')
         }
     };
    render(){
        return(
            <Loading/>
        );
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    modal:state.modalReducer,
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    authChanged, getQuestList
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
