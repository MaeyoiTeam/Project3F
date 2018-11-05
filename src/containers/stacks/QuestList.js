import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getQuestList,fetchQuest} from '../../actions/quest'
import {Button} from 'react-native-elements';
class QuestList extends Component {
    componentDidMount(){
          this.props.getQuestList(this.props.authReducer.data.uid)
    }
//TODO Update Component หลังจาก สุ่มQuestมา 
// แสดงเฉพาะเควสที่ยังไม่เสร็จ
    render(){
        const {questReducer,authReducer,fetchReducer} = this.props;

        return(
            <View>
            {          
                questReducer.data.map((info, i) =>
                            <View key={i}>
                                <Text>Quest name: {info[1].name}</Text>
                                <Text>Quest type: {info[1].type}</Text>
                                <Button title={"Play "+info[1].name}
                                onPress = {
                                        () => {
                                            this.props.fetchQuest(authReducer.data.uid,info[0])
                                            this.props.navigation.navigate({
                                                routeName: 'Quest'
                                            });
                                        }
                                }
                                />
                            </View>
            )
            } 
            </View>
        );
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    questReducer:state.questReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    getQuestList, fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestList)