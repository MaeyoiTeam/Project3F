import React,{Component} from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {fetchUser} from '../../actions/signIn';
import {Header} from 'react-native-elements';
class RightComponent extends Component{
         componentWillMount() {
             this.props.fetchUser();
         }
render(){
    return(
        <View style={styles.container}>
                <Text>Right</Text>
        </View>
    );
}
}

const styles = StyleSheet.create({
    container:{

    }
})

const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
});
//Used to add dispatch (action) into props
const mapDispatchToProps={
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent)