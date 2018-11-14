import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getQuestList,fetchQuest} from '../../actions/quest'
import {Button} from 'react-native-elements';
class HistoryQuestList extends Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }


    componentDidMount(){
          this.props.getQuestList(this.props.authReducer.data.uid,"done")
    }

    render(){
        const {historyReducer,authReducer,fetchReducer} = this.props;
                        return(
            <View>
             {          
                historyReducer.data.map((type, index) => {
                    const arr = type[1]
                return  <View key={index}><Text>{type[0]}</Text>
                    {Object.values(arr).map((info, i) =>{
                        return <View key={i}>
                                <Text>Quest name: {info.name}</Text>
                                <Text>Quest type: {info.type}</Text>
                            </View> 
                        })
                    }
                </View>       
                })  
            }  
            </View>
        );
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    historyReducer: state.historyReducer,
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    getQuestList, fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryQuestList)