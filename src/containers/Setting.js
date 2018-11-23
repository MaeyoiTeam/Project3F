import { View,Text,StyleSheet,Image,Platform,TextInput,TouchableOpacity,ActivityIndicator,Dimensions,Modal} from 'react-native';
import React,{Component} from 'react';
import {Button,CheckBox,ButtonGroup} from 'react-native-elements'
import { connect } from 'react-redux';
import {signOut,updateIsShowNotification} from '../actions/signIn';
import { BlurView } from 'expo';

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

    render(){
        const {authReducer } = this.props;
        return(     
        <View style={styles.container}>
        
            <View style={styles.pa3}></View>
            <View style={styles.pa6}>
            
            <CheckBox title='On/Off Notification' iconRight checked={authReducer.data.isShowNotification} onPress = {this.toggleNotification}  />
            </View>
            <View style={styles.pa4}></View>
                <View style={styles.container1}>
                            <Modal visible={this.state.showMe}
                            onRequestClose={()=>console.warn("this is cloase request")}
                            animationType='fade' transparent  >
                             <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill}></BlurView>
                            <View style={styles.modalView1}></View>
                            <View style={styles.modalView}>
                            <Text > </Text>
                            <Text style={{fontFamily:'asd'}} >Project Manager</Text>
                            <Text style={{fontFamily:'asd'}}>Nutza007</Text>
                            <Text style={{fontFamily:'asd'}}></Text>
                            <Text ></Text>
                            <Text style={{fontFamily:'asd'}}>UX/UI Designer</Text>
                            <Text style={{fontFamily:'asd'}}>Nine9Belive</Text>
                            <Text style={{fontFamily:'asd'}}>Bally</Text>
                            <Text style={{fontFamily:'asd'}}>Wanchoice</Text>
                            <Text ></Text>
                            <Text style={{fontFamily:'asd'}}>Deverloper</Text>
                            <Text style={{fontFamily:'asd'}}>InwMax</Text>
                            <Text style={{fontFamily:'asd'}}>Mojo Jojo</Text>
                            <TouchableOpacity onPress={()=>{this.setState({
                                showMe:false
                            })}}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>

                            <TouchableOpacity onPress={()=>{this.setState({
                                showMe:true
                            })}}>
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
                <Image source={require('../../image/Logout.png')} fadeDuration={0} style={{width: 50, height: 50}}
                      /></View> 
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
    pa3: {backgroundColor: 'white', flex: 0.1,
    },
    pa4: {backgroundColor: 'white', flex: 0.01,
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
    openText:{backgroundColor:'#FBFBFB',
            color:'black',
            padding: 13,
            paddingLeft: 20,
            margin:10,
            borderWidth: 1,
            borderColor: '#eaeaea', 
            fontFamily:'asd'          
    },
});

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    signOut, updateIsShowNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
