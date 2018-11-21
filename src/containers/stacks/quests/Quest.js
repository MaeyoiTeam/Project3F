import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest,updateQuestDone,getQuestList} from '../../../actions/quest'
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
            prevLevel:{}
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
             }
        }
    } 

    update=(user,key,point)=>{
        this.props.updateQuest(user, key, this.state.current+point);
    }

    render(){
        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target,key,point,star,level,isComplete,prevLevel}=this.state;

        if (isComplete){   //Quest Complete
                    return(<View style = {{paddingTop:180}}>
                    <Text>Current {type} star :{prevLevel.star}/{prevLevel.target}->{star}/{target}</Text>
                    <Text>level: {prevLevel.level}/{level}</Text>
                    <Text>Quest is Complete</Text>
                      <Button title="Go Home"
                      buttonStyle={{
                        backgroundColor: "rgba(10, 10,100, 1)",
                        height:80,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        }}
                    onPress={()=>this.props.navigation.navigate('Home')}/>  
                    </View>);
        }
        else{    //Quest Continue
            return(
            <View>
                <View style = {{paddingTop:180}}>
                    <Text style = {{textAlign: 'center',fontSize:15}}>{name} Type: {type}</Text>
                <Text style = {{textAlign: 'center',fontSize:15}}>Detail: {detail} </Text>
                <Text style = {{textAlign: 'center',fontSize:15}}>Finished: {current}/{target}</Text>
                  <Button buttonStyle={{
                                    backgroundColor: "rgba(10, 10,100, 1)",
                                    height:80,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius:360,
                                    }} title={"Up "+point+" point"} onPress={()=>this.update(authReducer.data,key,point)}/>  
                </View>
                
            </View>
            );
        }
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest, fetchQuest, updateQuestDone, getQuestList
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)