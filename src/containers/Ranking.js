import React, { Component } from 'react';
import {ScrollView, View,Text,StyleSheet } from 'react-native';
import {Button,Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchData,fetchRanking} from '../actions'
import {Font} from 'expo'

class Ranking extends Component{
    constructor(props){
        super(props)
        this.state={fontLoaded:false}
    }
     componentDidMount(){
        this.props.fetchRanking()
        Font.loadAsync({
            'Segoe-Script' : require('../../assets/fonts/segoesc.ttf')
        }).then(()=>{
            this.setState({fontLoaded:true});
            this.defaultFonts();
        })
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
        if(this.props.authReducer.isAuth &&this.state.fontLoaded){
        return(<View style={styles.container}>
            

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
                <View style={styles.container}>
                
                <Text style={styles.ku4}>Your Star</Text>
                </View>   
                     {
                         this.current!=null &&<View>
                          <Text>Rank: {this.current.index+1} : {this.current.data.name}</Text>
                        <Text>     Star:  {this.current.data.score}</Text>
                         </View>
                      }
            </View>
            </View>
        );
    }else{
        return(<View><Text>Rank: Please Login</Text></View>);
    }
    }
   
}
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
  },
    ku1: {
        flex: 0.02,
        
    },
    ku2: {
        flex: 0.025,
    },
    ku3: {
        flex: 0.4,
    },
    ku4:{
        color: 'blue',
        fontSize:20,
        fontWeight: 'bold',
        fontFamily: "Segoe-Script",
    }
  });
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