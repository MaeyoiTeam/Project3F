import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getQuest} from '../../actions/quest'
import {Button} from 'react-native-elements';
class QuestList extends Component {
    componentDidMount(){
          this.props.getQuest(this.props.authReducer.data) 
    }
//TODO Update Component หลังจาก สุ่มQuestมา 

    
    render(){
        const {questReducer,authReducer,fetchReducer} = this.props;
        return(
            <View>
            {
                
                questReducer.data.map((data)=>{ const quest = Object.values(data)
                    return quest.map((info,i)=><View key={i}>
                                <Text>Quest name: {info.name}</Text>
                                <Text>Quest detail: {info.detail}</Text>
                                <Text>Quest type: {info.type}</Text>
                                <Text>Quest target: {info.target}</Text>
                                <Text>Quest current: {info.current}</Text>
                                <Button title="Go to Quest"
                                onPress={()=>this.props.navigation.navigate({routeName:'Quest'})}
                                />
                            </View>
                                    )
                    })
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
    getQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestList)