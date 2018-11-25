import { View,Text,StyleSheet,Image,ScrollView } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import {Button} from 'react-native-elements'
import {updateMidAuth} from '../actions/signIn'

/* import { VictoryBar } from "victory-native"; */
import PureChart from 'react-native-pure-chart'
import PatternProfile from '../component/PatternProfile';

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

         
        sortWalkStacks=()=>{
            let result=[]
            const walk = Object.entries(this.props.authReducer.data.walkStacks);
            walk.map((obj,i)=>{
                const box = {
                    x: obj[0], 
                    y:obj[1]
                }
                result.push(box);
            }
                );

            return [{ seriesName: "Your WalkStacks", data: result, color: "#297AB1" }];
        }
         

    render(){
        this.sortWalkStacks();
        const {authReducer} = this.props
        const {food,walk,rest}= authReducer.data.levelQ;
        return <ScrollView showsVerticalScrollIndicator={false}>
           <PatternProfile data={authReducer.data}/>
            <View style={styles.ko}></View>
            <View style={{ flex: 0.005, alignItems: 'center'}}>
                <Button title="Achievement Earned" onPress={this.goToAchievement} buttonStyle={{ backgroundColor: "#DCDCDC", width: 240, height: 50, borderColor: "transparent"}} textStyle={{ fontFamily: "asd", color: "#000000" }} />
                <Button title="Completed Quest" onPress={this.goToHistoryQuest} buttonStyle={{ backgroundColor: "#8e8e8e", width: 240, height: 50, borderColor: "transparent"}} textStyle={{ fontFamily: "asd", color: "#ffffff" }} />
            </View>
            <Text
                style={{ fontFamily: "asd", textAlign: "center" }}
            >
               Your WalkStacks
            </Text>
            {authReducer.data.walkStacks != null && <PureChart data={this.sortWalkStacks()} type="bar" xAxisColor={"black"} height={100} yAxisColor={"red"} />}
          </ScrollView>;
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
        paddingTop:15
    }
 
  });

export default connect(mapStateToProps, mapDispatchToProps)(Profile)