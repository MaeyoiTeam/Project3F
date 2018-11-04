import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getQuest} from '../../actions/quest'
class Quest extends Component {
    componentDidMount(){
         this.props.getQuest(this.props.authReducer.data)
         
    }
    render(){
        const {fetchReducer,authReducer} = this.props;
        return(
            <View>
                <Text>QUEST</Text>
                <Text>{this.props.name}</Text>
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
    getQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)