import React, { Component } from 'react';
import {ScrollView, View,Text,StyleSheet,TouchableHighlight } from 'react-native';
import {Button,Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchRanking,fetchProfile} from '../actions'
import {Font} from 'expo'
import Loading from '../component/Loading'

class Ranking extends Component{
    constructor(props){
        super(props)
        this.state={fontLoaded:false}
        this.goToOtherProfile = this.goToOtherProfile.bind(this);
    }
     componentDidMount(){
        this.props.fetchRanking()
        Font.loadAsync({
            'Segoe-Script' : require('../../assets/fonts/segoesc.ttf')
        }).then(()=>{
            this.setState({fontLoaded:true});
        })
    }
    goToOtherProfile(uid){
        this.props.fetchProfile(uid)
        this.props.navigation.navigate("OtherProfile");
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
          this.current=0
        const {authReducer,rankReducer}=this.props;
        if (rankReducer.isFetching){
            return(<Loading/>)
        }
        else if(this.props.authReducer.isAuth &&this.state.fontLoaded){
        return(<View style={styles.container}>
                <View>
                <Text style = {styles.title}>Ranking</Text>
                     {
                        rankReducer.data.map((item, i) => {
                             if(item.uid==authReducer.data.uid){
                                this.current=i
                             }
                            return  <TouchableHighlight onPress={()=>this.goToOtherProfile(item.uid)} key={i}>
                               <View>
                                    <View style = {{padding:3,flexDirection: 'row'}}>
                                <Avatar rounded small source = {{uri: item.photoURL}} />
                                <Text style = {{left:10}} >Rank: {i+1} : {item.name}</Text>
                            </View>
                            <Text style={{left:50}}>   Star:  {item.star}</Text>
                               </View>
                            </TouchableHighlight>
                        })
                     }
                <View style={styles.container}>
                
                <Text style={{fontSize:25,fontWeight: 'bold',fontFamily: "Segoe-Script",padding:5}}>Your Rank!</Text>
                </View>   
                     {
                         authReducer.isAuth && < View >
                          <Text>Rank: {this.current} : {authReducer.data.name}</Text>
                        <Text>     Star:  {authReducer.data.star}</Text>
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
    fetchRanking, fetchProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)