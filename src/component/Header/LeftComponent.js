import React,{Component} from 'react';
import {StyleSheet,View,Text,Image } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {authChanged} from '../../actions/signIn';
import {Header} from 'react-native-elements';
import {navigate} from '../../actions';
class LeftComponent extends Component{
render(){
    return(
        <View>
            <Image
                 source={require('../../../../Project3F/image/YellowStar.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,marginLeft:20}}
                 
                 
                 />
        </View>

        /*<View style={styles.container}>
                {   this.props.authReducer.isAuth &&
                <View style={{marginLeft:20}}>
                    <Avatar
                        size="small"
                        rounded
                        source={{ uri: this.props.authReducer.data.photoURL }}
                        onPress={() => this.props.navigate("Profile")}
                        activeOpacity={0.7}
                    />
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
  authChanged, navigate
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftComponent)