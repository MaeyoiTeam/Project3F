import React,{Component} from 'react';
import {StyleSheet,View,Text } from 'react-native';
import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {authChanged} from '../../actions/signIn';
import {Header} from 'react-native-elements';
import {navigate} from '../../actions';
class LeftComponent extends Component{
         componentWillMount() {
            this.props.authChanged()
         }
render(){
    return(
        <View style={styles.container}>
                {   this.props.authReducer.isAuth &&
                <View>
                    <Avatar
                        size="small"
                        rounded
                        source={{ uri: this.props.authReducer.data.photoURL }}
                        onPress={() => this.props.navigate("Profile")}
                        activeOpacity={0.7}
                    />
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
  authChanged, navigate
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftComponent)