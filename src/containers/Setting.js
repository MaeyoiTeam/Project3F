import { View,Text,StyleSheet,Image,Platform,TextInput,TouchableOpacity,ActivityIndicator,Dimensions,Modal } from 'react-native';
import React,{Component} from 'react';
import {Button,CheckBox} from 'react-native-elements'
import { connect } from 'react-redux';
import {signOut,updateIsShowNotification} from '../actions/signIn';
class Setting extends Component {
    static navigationOptions = () => ({
 
  });
    constructor(props){
        super(props);
        this.state={
            showMe: false
        }
    }


     logOut = () => {
         return new Promise(async (resolve, reject) => {
             this.props.signOut()
            return resolve("SignIn")
         })
     }

    render(){
        const {authReducer } = this.props;
        return(     
        <View style={styles.container}>
        
            <View style={styles.pa3}></View>
            <CheckBox title = 'On-Off Notification'
            checked = {
               authReducer.data.isShowNotification
            }
            iconRight onPress = {
                () => this.props.updateIsShowNotification(authReducer.data,!authReducer.data.isShowNotification)
            }
            />
  
            <View style={styles.pa4}></View>
                <View style={styles.container1}>
                            <Modal visible={this.state.showMe}
                            onRequestClose={()=>console.warn("this is cloase request")}>
                            <View style={styles.modalView}>
                            
                            <Text >Project Manager</Text>
                            <Text >Nutza007</Text>
                            <Text ></Text>
                            <Text ></Text>
                            <Text >UX/UI Designer</Text>
                            <Text >Nine9Belive</Text>
                            <Text >Bally</Text>
                            <Text >Wanchoice</Text>
                            <Text ></Text>
                            <Text >Deverloper</Text>
                            <Text >InwMax</Text>
                            <Text >Mojo Jojo</Text>
                            <TouchableOpacity onPress={()=>{this.setState({
                                showMe:false
                            })}}>
                                <Text style={styles.closeText}>Go to Setting</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>
                            <TouchableOpacity onPress={()=>{this.setState({
                                showMe:true
                            })}}>
             <Text style={styles.openText}>About US</Text>
        </TouchableOpacity>
        </View>   
            <View style={styles.pa1}></View>
            <View style={styles.pa2}>
                <Button title="Logout Account"
                    onPress={async ()=>{let path = await this.logOut();
                    this.props.navigation.navigate(path);
                    }}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",width: 150,height: 40,borderColor: "transparent",borderWidth: 0,marginLeft:54
                    }}/>
                <Image source={require('../../image/Logout.png')} fadeDuration={0} style={{width: 50, height: 50}}
                      />                       
            </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white', alignItems: 'center'
  },
    pa1:{
    flex: 0.65,
    },
    pa2: {backgroundColor: 'white', flex: 0 ,flexDirection: 'row'     
    },
    pa3: {backgroundColor: 'white', flex: 0.2,
    },
    pa4: {backgroundColor: 'white', flex: 0.05,
    }, 
    modalView:{backgroundColor:'#aaa',
            //height:150,
            justifyContent:'center',
            alignItems:'center'
        },
    closeText:{backgroundColor:'#333',
            color:'#bbb',
            padding:5,
            margin:20
        }, 
    openText:{backgroundColor:'#333',
            color:'#bbb',
            padding:5,
            margin:20
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
