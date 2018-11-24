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
        <Text style={{fontFamily:'asd'}}>How Get Star</Text>
        <Text style={{fontFamily:'asd'}}>999 Step => 1 Star</Text>
        <Text style={{fontFamily:'asd'}}>2018 Step => 1 Star</Text>
        <Text style={{fontFamily:'asd'}}>4500 Step => 1 Star</Text>
        <Text style={{fontFamily:'asd'}}>6500 Step => 1 Star</Text>
        <Text style={{fontFamily:'asd'}}>9999 Step => 2 Star</Text>
        <Text style={{fontFamily:'asd'}}>20000 Step => 2 Star</Text>
        <Text style={{fontFamily:'asd'}}>40000 Step => 2 Star</Text>
        <Text style={{fontFamily:'asd'}}>65000 Step => 2 Star</Text>
        <Text style={{fontFamily:'asd'}}>100000 Step => 4 Star</Text>
        <Text style={{fontFamily:'asd'}}></Text>
        <Text style={{fontFamily:'asd'}}></Text>
        <Text style={{fontFamily:'asd'}}></Text>
    
        <Badge onPress={this.closeModal} containerStyle={{ backgroundColor: '#330066',width:150}} textStyle={{fontFamily:'asd',fontSize:20}} value={'Close'} />
        
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
});
