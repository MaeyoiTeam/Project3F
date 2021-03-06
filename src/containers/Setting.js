import { View,Text,StyleSheet,Image,Platform,TextInput,TouchableOpacity,ActivityIndicator,Dimensions,Modal} from 'react-native';
import React,{Component} from 'react';
import {Button,CheckBox,ButtonGroup} from 'react-native-elements'
import { connect } from 'react-redux';
import {signOut,updateIsShowNotification} from '../actions/signIn';
import { BlurView } from 'expo';
import AboutUs from '../component/AboutUs';

class Setting extends Component {
    static navigationOptions = () => ({
 
  });
    constructor(props){
        super(props);
        this.state={
            showMe: false
        }
        this.logOut = this.logOut.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
    }


     logOut(){
             this.props.signOut();
         this.props.navigation.navigate('SignIn')
     }
    toggleNotification(){
         this.props.updateIsShowNotification(this.props.authReducer.data, !this.props.authReducer.data.isShowNotification)
     }

     openAboutUs=()=>{
        this.setState({
            showMe:true
        })
     }
     closeAboutUs=()=>{
        this.setState({
            showMe:false
        })
     }

    render(){
        const {authReducer } = this.props;
        return(     
        <View style={styles.container}>
        
            <View style={styles.pa3}></View>
            
            <View style={{flexDirection: 'row'}}>
            <Text style = {styles.notiText}>On/Off Notifications</Text>
            <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                    }}>
            <CheckBox checked={authReducer.data.isShowNotification} onPress = {this.toggleNotification} checkedIcon = 'dot-circle-o' uncheckedIcon = 'circle-o' iconRight right/>
            </View>
            </View>
           
            <View style={styles.pa4}></View>
                <View style={styles.container1}>
                            <AboutUs showMe={this.state.showMe} closeAboutUs={this.closeAboutUs}/>

                            <TouchableOpacity onPress={this.openAboutUs}>
             <Text style={styles.openText}>About US</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.pa5}>
            <View style={styles.pa1}></View>
            <View style={styles.pa2}>
                <Button title="Logout Account"
                    onPress={this.logOut}
                    buttonStyle={{
                        backgroundColor: "#4c4c4c",width: 150,height: 40,borderColor: "transparent",borderWidth: 0,marginLeft:54
                    }}/>
                    <TouchableOpacity  onPress={this.logOut}>
                <Image source={require('../../image/Logout.png')} fadeDuration={0} style={{width: 50, height: 50} }  
                      />
                      </TouchableOpacity>
                      </View> 
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white', 
  },
    pa1:{
    flex: 1,
    },
    pa2: {backgroundColor: 'white', flex: 0 ,flexDirection: 'row',    
    },
    pa3: {backgroundColor: 'white', flex: 0.08, textAlign: 'left'
    },
    pa4: {backgroundColor: 'white', flex: 0.005,
    },
    pa5: { alignItems: 'center' ,flex: 0.8,
    },
    modalView1:{
        flex:0.4
         }, 
    modalView:{backgroundColor:'#fff',
            height:290,
            width: 320,
            justifyContent:'center',
            alignItems:'center',
            alignSelf: 'center'
        },
    closeText:{backgroundColor:'#333',
            color:'#bbb',
            padding:5,
            margin:20,
            fontFamily:'asd'
        }, 
    openText:{backgroundColor:'transparent',
            color:'black',
            paddingLeft: 20,
            margin:10,
            fontFamily:'asd',
            fontSize: 20
            
                   
    },
    notiText:{backgroundColor:'transparent',
        color:'black',
        paddingLeft: 20,
        margin:10,
        fontFamily:'asd',
        fontSize: 20,
    }
});

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    signOut, updateIsShowNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
