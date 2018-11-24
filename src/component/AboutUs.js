import React, { Component } from 'react'
import { Text, View,Modal,StyleSheet,TouchableOpacity } from 'react-native'
import { BlurView } from 'expo';

export default class AboutUs extends Component {

    closeModal=()=>{
        this.props.closeAboutUs();
    }

  render() {
    return (
        <Modal visible={this.props.showMe}
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
        <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        </View>
        </Modal>
        
    )
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
