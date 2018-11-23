import { View,Text,StyleSheet,Alert ,Modal,TouchableOpacity,Image} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest,updateQuestDone,getQuestList} from '../../../actions/quest'
import {updateNotification} from '../../../actions/notification'
import { BlurView } from 'expo';
class Quest extends Component {
  static navigationOptions = ({
      navigation
  }) => {
      return {
          title: navigation.getParam('otherParam', "Quest"),
      };
  };
    constructor(props){
        super(props);

        this.state={
            key:"none",
            name: "none",
            type: "none",
            detail:"none",
            current:0,
            target:0,
            point:0,
            star:0,
            level:0,
            isComplete:false,
            prevLevel:{},
            showMe:false
        }
    }
     componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.fetchReducer.data!=this.props.fetchReducer.data){
            this.setState({
                ...this.props.fetchReducer.data,
                prevLevel: { ...prevProps.authReducer.data.levelQ[this.state.type]
                }
            })
             if (this.props.fetchReducer.data.isComplete) {
                 this.props.getQuestList(this.props.authReducer.data.uid, "undone");
                 this.props.updateQuestDone(this.props.authReducer.data,this.state.key,this.state.type);
                    this.props.updateNotification(this.props.authReducer.data.uid,{
                     name: "Food Quest Success",newStar:prevProps.fetchReducer.data.star, currentStar: this.props.fetchReducer.data.star, date: new Date().toISOString()
                 },this.props.notification.data) 
             }
        }
    } 

    update=(user,key,point)=>{
        this.props.updateQuest(user, key, this.state.current+point);
    }
    
    decisionQuest=()=>{
        Alert.alert(
            'Completed',
            'Congratulations',
            [
              
              {text: 'OK',  onPress:()=>this.props.navigation.navigate('Home')}  ,
            ],
            { cancelable: false }
          )
    }




    render(){
        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel}=this.state;

        if (isComplete){this.decisionQuest()                                            //Quest Complete
                    return(<View style = {{paddingTop:180,alignItems:'center'}}>
                    <Text style={{color:'white'}}>Current {type} star :{prevLevel.star}/{prevLevel.target}->{star}/{target}</Text>
                    <Text style={{color:'white'}}>level: {prevLevel.level}/{level}</Text>
                    <Text style={{color:'white'}}>Quest is Complete</Text>
                      <Button title="Go Home"
                      buttonStyle={{
                        backgroundColor: "white",
                        height:20,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        }}
                    onPress={()=>this.props.navigation.navigate('Home')}/>  
                    </View>);
        }
        else{    //Quest Continue
            return(  <View style={styles.contra}>
            <View style={styles.kl1}></View>
            <Image
                source={require('../../../../image/food2.png')}
                style={{width: 180, height: 180}}
                />
                
            <View style={styles.modalView1}></View>
                    <Text style = {{textAlign: 'center',fontSize:30,fontFamily:'asd'}}>{name} </Text>
                <Text style = {{textAlign: 'center',fontSize:22,fontFamily:'asd'}}>Detail: {detail} </Text>
             
                <View style={styles.kl1}></View>
                <Text style = {{textAlign: 'center',fontSize:15,fontFamily:'asd'}}>Finished: {current}/{target}</Text>
                
                            
                            <View style={styles.modalView}></View>
                
                  <Button buttonStyle={{
                                    backgroundColor: "rgba(10, 10,100, 1)",
                                    height:40,width:300,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius:360,
                                    }} title={"Submit"} onPress={()=>this.update(authReducer.data,key,point)}/> 
        
        </View>);
        }
    }
}

const styles = StyleSheet.create({
modalView1:{
    flex:0.2,
 },
modalView:{
   alignItems:'center' ,
   flex:0.05
},
contra:{
    flex:1,
    alignItems: 'center'
},
kl1:{
    flex:0.2,
},
kl2:{
    flex:0.2
}
});
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    notification: state.notification,
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList, updateNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)