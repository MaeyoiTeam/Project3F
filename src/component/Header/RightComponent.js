import React,{Component} from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {authChanged} from '../../actions/signIn';
import {Header} from 'react-native-elements';
class RightComponent extends Component{
         componentWillMount() {
             this.props.authChanged();
         }
render(){
    return(
        <View style={styles.container}>
        {   this.props.authReducer.isAuth && <View>
                <Text>{this.props.authReducer.data.displayName} </Text>
            </View>
                }
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
  authChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent)