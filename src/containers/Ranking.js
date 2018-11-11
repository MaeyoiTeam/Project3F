import React, { Component } from 'react';
import {ScrollView, View,Text } from 'react-native';
import {Button,Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchData,fetchRanking} from '../actions'

class Ranking extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchRanking()
    }

    render(){
        const styles = {container: {
            alignItems: 'center'
          },
          title: {
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
          }};
          
        const current={};
        props=this.props;
        if(this.props.authReducer.isAuth){
        return(
            <ScrollView>
                <View>
                <Text style = {styles.title}>Ranking</Text>
                     {
                        props.rankReducer.data.map((item, i) => {
                             if(item.uid==props.authReducer.data.uid){
                                this.current={data:item,index:i}
                             }
                            return <View key={i}>
                                <Text>Rank: {i+1} : {item.name}</Text>
                                <Text>     Score:  {item.score}</Text>
                            </View>
        })
                     }
                     <Text>Your Star</Text>
                     {
                         this.current!=null &&<View>
                          <Text>Rank: {this.current.index+1} : {this.current.data.name}</Text>
                        <Text>     Star:  {this.current.data.score}</Text>
                         </View>
                      }
                </View>
            </ScrollView>
        );
    }else{
        return(<View><Text>Rank: Please Login</Text></View>);
    }
    }
   d
}
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
    rankReducer: state.rankReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    fetchData, fetchRanking
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)