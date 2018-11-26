import { View,Text,StyleSheet,Image,ScrollView } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import PatternProfile from '../../component/PatternProfile'
import PureChart from "react-native-pure-chart";
class OtherProfile extends Component {

    static navigationOptions = ({
        navigation
    }) => {
        return {
            title: navigation.getParam('otherParam', "Profile"),
        };
    };
    
    constructor(props) {
        super(props);
        this.goToHistoryQuest = this.goToHistoryQuest.bind(this);
        this.goToAchievement = this.goToAchievement.bind(this);
    }

    goToHistoryQuest() {
        this.props.navigation.navigate("History", { uid: this.props.fetchReducer.data.uid })
    }

    goToAchievement() {
        this.props.navigation.navigate("Achievement", { uid: this.props.fetchReducer.data.uid })
    }

    sortWalkStacks = () => {
        let myResult = []
        let otherResult = [];
        const myWalk = Object.entries(this.props.authReducer.data.walkStacks);
        myWalk.map((obj, i) => {
            const box = {
                x: obj[0],
                y: obj[1]
            }
            myResult.push(box);
        }
        );
        const otherWalk = Object.entries(this.props.fetchReducer.data.walkStacks);
        otherWalk.map((obj, i) => {
            const box = {
                x: obj[0],
                y: obj[1]
            }
            console.log(obj)
            otherResult.push(box);
        }
        );
        return [{ seriesName: "Your WalkStacks", data: myResult, color: "#297AB1" }, { seriesName: "WalkStacks", data: otherResult, color: "#d82a00" }];
    }

    render(){
        const {fetchReducer} = this.props;
         const {displayName,photoURL,star,levelQ} =fetchReducer.data

        return <ScrollView showsVerticalScrollIndicator={false}>
            {!fetchReducer.isFetching && <PatternProfile data={this.props.fetchReducer.data} />}
            <View style={styles.ko} />
            <View style={{ flex: 0.005, alignItems: "center" }}>
              <Button title="Achievement Earned" onPress={this.goToAchievement} buttonStyle={{ backgroundColor: "#DCDCDC", width: 240, height: 50, borderColor: "transparent" }} textStyle={{ fontFamily: "asd", color: "#000000" }} />
              <Button title="Completed Quest" onPress={this.goToHistoryQuest} buttonStyle={{ backgroundColor: "#8e8e8e", width: 240, height: 50, borderColor: "transparent" }} textStyle={{ fontFamily: "asd", color: "#ffffff" }} />
            </View>
            <Text style={{ fontFamily: "asd", textAlign: "center" }}>
              Your WalkStacks
            </Text>
            {fetchReducer.data.walkStacks != null && <PureChart data={this.sortWalkStacks()} type="bar" xAxisColor={"black"} height={100} yAxisColor={"red"} />}
          </ScrollView>;
    }
}


// Used to add reducer's states into the props
const mapStateToProps = state => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
};
const styles = StyleSheet.create({  
    container: {
    marginLeft:0,
    marginRight:0,
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center',
    
  },
    ko: {
        paddingTop: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile)