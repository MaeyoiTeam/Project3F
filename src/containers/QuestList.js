import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getQuest} from '../actions/quest'
class QuestList extends Component {
    componentDidMount(){
         this.props.getQuest(this.props.authReducer.data)
         
    }
    render(){
        const {fetchReducer,authReducer} = this.props;
        const obj = Object.values(fetchReducer.data);
        return(
            <View>
            {
                
                 obj.map((data)=>{ const quest = Object.values(data)
                    return quest.map((info,i)=><View key={i}>
                                <Text>{info.name}</Text>
                                <Text>{info.detail}</Text>
                                <Text>{info.type}</Text>
                                <Text>{info.target}</Text>
                                <Text>{info.current}</Text>
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
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    getQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestList)