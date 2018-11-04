import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import {updateQuest} from '../../actions/quest'
class Quest extends Component {

    constructor(props){
        super(props);
        this.state={
            name: "none",
            type: "none",
            detail:"none",
            current:0,
            target:0
        }
    }
    render(){

        const {fetchReducer,authReducer} = this.props;
        const {name,type,detail,current,target}=this.state;
        console.log(fetchReducer.data.key)
        return(
            <View>
                <Text>QUEST</Text>
                {   fetchReducer.data.quest!=null   &&<View>
                    <Text>Name: {fetchReducer.data.quest.name||name} Type: {fetchReducer.data.quest.type||type}</Text>
                <Text>Detail: {fetchReducer.data.quest.detail||detail} </Text>
                <Text>Exp: {fetchReducer.data.quest.current||current}/{fetchReducer.data.quest.target||target}</Text>
                <Button title="Up 10" onPress={()=>this.props.updateQuest(authReducer.data.uid,fetchReducer.data.key,10)}/> {/*//!!บัค เวลาเปลี่ยนเควสแล้วพ้อยเด้ง */}
                </View>
                }
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
    updateQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest)