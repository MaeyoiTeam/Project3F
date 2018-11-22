import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

class OtherProfile extends Component {
    
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


    render(){
        const {fetchReducer} = this.props;
         const {displayName,photoURL,star,levelQ} =fetchReducer.data

        return(<View style={styles.container}>
                <Text style={{textAlign:'center',paddingTop:10,paddingBottom:30,left:100}}></Text>
                 <Avatar xlarge rounded source={{ uri: photoURL }} onPress={() => console.log("Works!")} />
                <Text style={{paddingTop:20,fontSize:15,textAlign:'center'}}>{displayName}</Text>
                <Text>Star:{star}</Text>
               <Text style={{textAlign:'center',paddingTop:10,paddingBottom:30,left:100}}> X Star : {star}</Text>
                            {
                                fetchReducer.data.levelQ!=null &&
                            <View>
                                        <View style={{
                                            padding: 5,
                                            flexDirection: 'row'
                                        }}>

                                                
                                    <ProgressBarAnimated width = {200}
                                    backgroundColor = "#6CC644"
                                    value = {(levelQ.walk.star*100)/levelQ.walk.target}/>
                                    <Text style = {{left:10}}>{levelQ.walk.star}/{levelQ.walk.target}</Text> 
                                    </View>
                            <Text>Level:{levelQ.walk.level}</Text>
                            <View style = {{
                                padding:5, 
                                flexDirection: 'row'
                                }}>
                                    <Image
                                        source={require('../../../image/food2.png')}
                                        fadeDuration={0}
                                        style={{ width: 25, height: 25, right: 10 }}
                                    />
                                    <ProgressBarAnimated width={200}
                                        backgroundColor="#6CC644"
                                        value={(levelQ.food.star * 100) / levelQ.food.target} />
                                    <Text style={{ left: 10 }}>{levelQ.food.star}/{levelQ.food.target}</Text>
                                </View>
                                <Text>Level:{levelQ.food.level}</Text>
                                <View style={{
                                    padding: 5,
                                    flexDirection: 'row'
                                }}>
                            
                            <Image
                            source={require('../../../image/steps.png')}
                            fadeDuration={0}
                            style={{width: 25, height: 25,}}
                            />
                            <Image
                            source={require('../../../image/food2.png')}
                            fadeDuration={0}
                            style={{width: 25, height: 25,}}
                            />
                            <Image
                            source={require('../../../image/yoga.png')}
                            fadeDuration={0}
                            style={{width: 25, height: 25,}}
                            />
                            
                            <ProgressBarAnimated width = {200}
                            backgroundColor = "#6CC644"
                            value = {(levelQ.rest.star*100)/levelQ.rest.target}/>
                            <Text style = {{left:10}}>{levelQ.rest.star}/{levelQ.rest.target}</Text>   
                            </View>
                            <Text>Level:{levelQ.rest.level}</Text>
                            </View>}
                <View style = {{paddingTop:10}}></View>
                <View style = {{paddingTop:10}}></View>
        </View>);
    }
}


// Used to add reducer's states into the props
const mapStateToProps = state => ({
  fetchReducer: state.fetchReducer,
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
};
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile)