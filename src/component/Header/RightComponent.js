import React,{Component} from 'react';
import { StyleSheet,View,Text,Image } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {authChanged} from '../../actions/signIn';
import {Header} from 'react-native-elements';
class RightComponent extends Component{
render(){
    return(
        <View>
            <Image
                 source={require('../../../image/icon.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,marginRight:20}}
                 
                 
                 />
        </View>
        /*<View style={styles.container}>
        {   this.props.authReducer.isAuth && <View>
                <Text>{this.props.authReducer.data.displayName} </Text>
            </View>
                }
        </View>*/
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