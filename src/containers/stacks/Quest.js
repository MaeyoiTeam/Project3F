import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest,fetchQuest} from '../../actions/quest'
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
            point:0
        }
    }
     componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.fetchReducer.data!=this.props.fetchReducer.data){
            this.setState({
                ...this.props.fetchReducer.data
            })
        }
    } 
//TODO Quest สำเร็จ (current>=target) ให้เด้งป๊อปอัพ

    render(){
        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target,key,point}=this.state;
        return(
            <View>
                <Text>QUEST</Text>
                <View>
                    <Text>Name: {name} Type: {type}</Text>
                <Text>Detail: {detail} </Text>
                <Text>Exp: {current}/{target}</Text>
                <Button title={"Up "+point+" point"} onPress={()=>this.props.updateQuest(authReducer.data.uid,key,point)}/> 
                </View>
                
            </View>
        );
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateQuest,fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)