import { View,Text,StyleSheet,Image,FlatList,AppRegistry,ScrollView} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getQuestList,fetchQuest} from '../../actions/quest'
import { clearMiddleHistory} from '../../actions/'
import {Button,List,ListItem} from 'react-native-elements';
const moment = require('moment');
class HistoryQuestList extends Component {
    static navigationOptions = ({
        navigation
    }) => {
        return {
            title: navigation.getParam('otherParam', "Completed Quest"),
            
        };
    };
    constructor(props){
        super(props);
        this.state={
        };
    }
 

    componentWillMount(){
        this.props.getQuestList(this.props.navigation.state.params.uid,"done")
    }

    componentWillUnmount(){
        this.props.clearMiddleHistory();
    }


    render(){
        const {historyReducer} = this.props;
                        return(
                <View style={styles.container}>
                <ScrollView>
                {  historyReducer.haveHISTORY &&
                historyReducer.data.map((type, index) => {
                    const arr = type[1]
                return  <View key={index}><Text style={{fontFamily:'asd',fontSize:25, paddingLeft:10}}>{type[0]}</Text>
                 <View style={styles.pa3}></View>
                    {
                        Object.values(arr).map((info, i) =>{
                        if(info.type!='walk'){
                            return (<View key={i}>
                                <View style={styles.pa1}>
                                    
                                        <Text style={{fontFamily:'asd', paddingLeft:15}}>Quest name : {info.name}</Text>
                                        <View style={{flexDirection:'row', flex:1}}>
                                        <Text style={{ fontFamily: 'asd', paddingLeft: 15,flex:0.8}}>star : {info.star}</Text>
                                        <Text style={{fontFamily:'asd',flex:2}}>Date : {moment(info.date).format('LLL')}  </Text>
                                        </View>
                                        <View key={i} style = {styles.separator}></View>
                                    </View>
                                </View>) 
                        }else{
                            return(<View key={i}>
                                        <Text style={{fontFamily:'asd', paddingLeft:15}}>Steps : {info.stepCount}</Text>
                                <Text style={{ fontFamily: 'asd', paddingLeft: 15,flex:0.5}}>star : {info.star}</Text>
                                        <Text style={{fontFamily:'asd',flex:2}}>Date : {moment(info.date).format('LLL')}  </Text>
                                        <View key={i} style = {styles.separator}></View>
                                    </View>
                                )
                        }
                        })
                    }
                </View>    
                })  
            }</ScrollView>     
            </View>
        );
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    historyReducer: state.historyReducer,
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    getQuestList, fetchQuest, clearMiddleHistory
};
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: 'white', alignItems: 'center',
  },
    pa1:{
    flex: 0.18,
    },
    pa3:{
        flex: 0.1,
        },
    separator: {
        marginVertical: 10,
        borderWidth: 1,
        width:400,
        borderColor: '#DCDCDC',

      },
});
export default connect(mapStateToProps, mapDispatchToProps)(HistoryQuestList)