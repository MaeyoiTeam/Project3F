import React, { Component } from 'react'
import { Text, View,Modal,StyleSheet,TouchableOpacity } from 'react-native'
import { BlurView } from 'expo';
import {Badge} from 'react-native-elements'

export default class Tails extends Component {

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
        <Text ></Text>
        <Text style={{fontFamily:'asd', fontSize: 18}}>How to Get Stars</Text>
        <View style = {styles.separator}></View>
        <Text style={{fontFamily:'asd', fontSize: 15}}>   999 Steps => 1 Star</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}>  2018 Steps => 1 Star</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}>  4500 Steps => 1 Star</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}>  6500 Steps => 1 Star</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}>  9999 Steps => 2 Stars</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}> 20000 Steps => 2 Stars</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}> 40000 Steps => 2 Stars</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}> 65000 Steps => 2 Stars</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}>100000 Steps => 4 Stars</Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}> </Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}> </Text>
        <Text style={{fontFamily:'asd', fontSize: 15}}> </Text>
    
        <Badge onPress={this.closeModal} containerStyle={{ backgroundColor: '#330066',width:125}} textStyle={{fontFamily:'asd',fontSize:15}} value={'Close'} />
        
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
            height:500,
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
    separator:{
        marginVertical: 10,
        borderWidth: 1,
        width:200,
        borderColor: '#DCDCDC',
    }
});
