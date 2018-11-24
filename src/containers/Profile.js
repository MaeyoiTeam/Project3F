import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import {updateMidAuth} from '../actions/signIn'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Font } from 'expo';
import { Colors } from 'react-native-paper';


class Profile extends Component{
    constructor(props){
        super(props);
        this.goToHistoryQuest = this.goToHistoryQuest.bind(this);
        this.goToAchievement = this.goToAchievement.bind(this);
    }
    componentDidMount(){
        this.props.updateMidAuth(this.props.authReducer.data.uid);
    }

         componentDidUpdate(prevProps, prevState, snapshot) {
             if (prevProps.authReducer.data != this.props.authReducer.data) {
                 this.setState({
                     ...this.props.authReducer.data
                 })
             }
         }
//TODO ทำให้เมื่อเวลอัพ starเพิ่ม อัพเดทอัตโนมัติ

        goToHistoryQuest(){
            this.props.navigation.navigate("History",{uid:this.props.authReducer.data.uid})
         }
         
        goToAchievement() {
            this.props.navigation.navigate("Achievement", { uid: this.props.authReducer.data.uid })
        }

         
         

         

    render(){
        const {authReducer} = this.props
        const {food,walk,rest}= authReducer.data.levelQ;
        
        return <View style={styles.container}>
            <Text style = {styles.a1}>Your Profile</Text>
            {authReducer.isAuth && <View>
                <Avatar containerStyle = {{left:90}} large rounded source={{ uri: authReducer.data.photoURL }} onPress={() => console.log("Works!")} />
                <Text style={styles.ki}>{authReducer.data.displayName}</Text>
                <Text>{authReducer.data.Email}</Text>
                
{/* //TODO แสดง เลเวล ค่าประสบการณ์ Objectที่เก็บข้อมูล = authReducer.data.levelQ */}
                <View style = {{                  
                    flexDirection: 'row',
                    flex:0.4
                    }}>
                <Image
                 source={require('../../image/star.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,left:90}}
                />    
                <Text style={{textAlign:'center',paddingTop:5,left:100,fontFamily:'asd'}}>X  {authReducer.data.star  }</Text>
                </View>
                <View style = {{flex:1}}>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row',
                    flex:0.25
                    }}>
                <Image
                 source={require('../../image/steps.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(authReducer.data.levelQ.walk.star*100)/authReducer.data.levelQ.walk.target}/>
                <Text style = {{fontFamily:'asd',left:10,fontSize:12}}>{walk.star}/{walk.target}</Text> 
                </View>
                <Text style = {{fontFamily:'asd',textAlign:'center'}}>Level:{walk.level}</Text>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row',
                    flex:0.25
                    }}>
                <Image
                 source={require('../../image/food2.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(authReducer.data.levelQ.food.star*100)/authReducer.data.levelQ.food.target}/>
                <Text style = {{fontFamily:'asd',left:10,fontSize:12}}>{food.star}/{food.target}</Text>         
                </View>
                <Text style = {{fontFamily:'asd',textAlign:'center'}}>Level:{food.level}</Text>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row',
                    flex:0.25
                    }}>
                <Image
                 source={require('../../image/yoga.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(authReducer.data.levelQ.rest.star*100)/authReducer.data.levelQ.rest.target}/>
                <Text style = {{fontFamily:'asd',left:10,fontSize:12}}>{rest.star}/{rest.target}</Text>   
                </View>
                <Text style = {{fontFamily:'asd',textAlign:'center'}}>Level:{rest.level}</Text>
                </View>
                
                <View style = {{flex:0.005}}>
                <Button title="Achievement Earned" 
                    onPress={this.goToAchievement}
                    buttonStyle={{
                        backgroundColor: "#DCDCDC",
                        width: 200,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        left:15
                        
                      }}
                      textStyle = {{fontFamily:'asd', color: '#000000'}}  
                />
                 
                    <Button title="Completed Quest"
                        onPress={this.goToHistoryQuest}
                        buttonStyle={{
                            backgroundColor: "#8e8e8e",
                            width: 200,
                            height: 40,
                            borderColor: "transparent",
                            borderWidth: 0,
                            left: 15
                        }}
                        textStyle = {{fontFamily:'asd', color: '#ffffff'}} 
                    />
                </View>
                <View style = {{flex:1}}></View>
              </View>}
          </View>;
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    authReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    updateMidAuth
};
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex:1
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily:'asd'
    },
    ki:{
        paddingTop:10,
        fontSize:15,
        textAlign:'center',
        fontFamily:'asd'
    },
    a1:{
        fontFamily:'asd',
        fontSize:25,
        paddingTop: 15
    },
    ko:{
        
        flex: 0.1

    }
 
  });

export default connect(mapStateToProps, mapDispatchToProps)(Profile)