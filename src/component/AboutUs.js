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
        <Text style={{fontFamily:'asd',fontSize:20}} >Frontend Team</Text>
        <Text style={{fontFamily:'asd'}}>Kanutsanun Nithipanich 59010164</Text>
        <Text style={{fontFamily:'asd'}}>Naphat Pechsrijun 59010386</Text>
        <Text style={{fontFamily:'asd'}}>Nithi Semamuang 59010736</Text>
        <Text style={{fontFamily:'asd'}}>Papon Prommool 59010792</Text>
        <Text > </Text>
        <Text style={{fontFamily:'asd',fontSize:20}}>Backend Team</Text>
        <Text style={{fontFamily:'asd'}}>Jakkapat Boonroj 59010187</Text>
        <Text style={{fontFamily:'asd'}}>Nontakon Charoencheewakul 59010679</Text>
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
            height:400,
            width: 350,
            justifyContent:'center',
            alignItems:'center',
            alignSelf: 'center'
        },
    closeText:{backgroundColor:'#333',
            color:'#bbb',
            padding:5,
            margin:20,
            fontFamily:'asd',
            width: 50,
            alignItems: 'center',
            

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
