import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import { randomQuest,getQuestList } from '../actions/quest'
class Home extends Component {

//TODO rerender หลังจากได้ค่าAuthReducerมาจากHeader เพื่อเรียกส่งauthReducer.data ให้ getQuest
//? ไปอ่านLife cylce reactมา
    
    randomQ=()=>{
       return new Promise(async (resolve, reject) => {
           this.props.randomQuest(this.props.authReducer.data).then(()=>{
               if (this.props.authReducer.isAuth) {
                   return resolve("QuestList")
               } else {
                   return reject("SignIn")
               }
           })
            
       })
    }

    render(){
        
        if(this.props.authReducer.isAuth){
              return(
            <View style={styles.container}>
            <View style={styles.ku1}></View>
            <View style={styles.ku2}>
                <Button title="Let's Achieve!" 
                    onPress={async ()=>{let path = await this.randomQ();
                    this.props.navigation.navigate(path);}}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 150,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 360  
                      }}  
                />
            </View>
            <View style={styles.ku3}>
                <Button title="Go QuestList" 
                    onPress={()=>this.props.navigation.navigate('QuestList')}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 150,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 360  
                      }}
                />
             </View>
             <View style={styles.ku4}>
                <Button title="Go Pedo" 
                    onPress={()=>this.props.navigation.navigate('Pedo')}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 150,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 360  
                      }}
                />
            </View>  
            </View>
        );
        }
        else{
          return <Text>Signing...</Text>
        }
    }
}
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
    questReducer:state.questReducer
})
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center'
  },
    
    ku1: {
      backgroundColor: 'white', 
      flex: 0.2,
    },
    ku2: {
      backgroundColor: 'white', 
      flex: 0.2,
    },
    ku3: {
      backgroundColor: 'white', 
      flex: 0.2,
    }
    
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    randomQuest, getQuestList
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)