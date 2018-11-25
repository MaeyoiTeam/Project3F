import { View,Text,StyleSheet,Image,ScrollView } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar,List,ListItem } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

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


    render(){
        const {fetchReducer} = this.props;
         const {displayName,photoURL,star,levelQ} =fetchReducer.data

        return(<View style={styles.container}>
                <Text style={{textAlign:'center',paddingTop:10,paddingBottom:20,left:100,fontFamily:'asd'}}></Text>
                 <Avatar large rounded source={{ uri: photoURL }} onPress={() => console.log("Works!")} />
                <Text style={{paddingTop:20,fontSize:15,textAlign:'center',fontFamily:'asd'}}>{displayName}</Text>
                <View style = {{                  
                    flexDirection: 'row',
                    flex:0.4
                    }}>
                <Image
                 source={require('../../../image/star.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25}}
                />    
                <Text style = {{paddingBottom:10,fontFamily:'asd'}}> x {star}</Text>
                </View>
               
                            {
                                fetchReducer.data.levelQ!=null &&
                                <ScrollView style={{flex:2}}>
                            <View>
                            <Text style = {{fontFamily:'asd',textAlign:'center'}}>Level:{levelQ.walk.level}</Text>
                                        <View style={{
                                            padding: 5,
                                            flexDirection: 'row',
                                            flex:0.33
                                        }}>
                                     <Image
                 source={require('../../../image/steps.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                 />
                                                
                                    <ProgressBarAnimated width = {200}
                                    backgroundColor = "#6CC644"
                                    value = {(levelQ.walk.star*100)/levelQ.walk.target}/>
                                    <Text style = {{left:10, fontFamily:'asd'}}>{levelQ.walk.star}/{levelQ.walk.target}</Text> 
                                    </View>
                                    <Text style = {{fontFamily:'asd',textAlign:'center'}}>Level:{levelQ.food.level}</Text>
                            <View style = {{
                                padding:5, 
                                flexDirection: 'row',
                                flex:0.33
                                }}>
                                    <Image
                                        source={require('../../../image/food2.png')}
                                        fadeDuration={0}
                                        style={{ width: 25, height: 25, right: 10 }}
                                    />
                                    <ProgressBarAnimated width={200}
                                        backgroundColor="#6CC644"
                                        value={(levelQ.food.star * 100) / levelQ.food.target} />
                                    <Text style={{ left: 10, fontFamily:'asd'}}>{levelQ.food.star}/{levelQ.food.target}</Text>
                                </View>
                                <Text style = {{fontFamily:'asd',textAlign:'center'}}>Level:{levelQ.rest.level}</Text>
                                <View style={{
                                    padding: 5,
                                    flexDirection: 'row',
                                    flex:0.33
                                }}>
                            
                            <Image
                            source={require('../../../image/yoga.png')}
                            fadeDuration={0}
                            style={{width: 25, height: 25,right:10}}
                            />
                            
                            <ProgressBarAnimated width = {200}
                            backgroundColor = "#6CC644"
                            value = {(levelQ.rest.star*100)/levelQ.rest.target}/>
                            <Text style = {{left:10, fontFamily:'asd'}}>{levelQ.rest.star}/{levelQ.rest.target}</Text>   
                            </View>
                            </View>
                          
                    <Button title="Achievement Earned"
                        onPress={this.goToAchievement}
                        buttonStyle={{
                            backgroundColor: "#DCDCDC",
                            width: 240,
                            height: 50,
                            borderColor: "transparent",
                        }}
                        textStyle = {{fontFamily:'asd', color: '#000000'}} 
                    />
                    <Button title="Completed Quest"
                        onPress={this.goToHistoryQuest}
                        buttonStyle={{
                            backgroundColor: "#8e8e8e",
                            width: 240,
                            height: 50,
                            borderColor: "transparent",
                        }}
                        textStyle = {{fontFamily:'asd', color: '#ffffff'}} 
                    />
                                    <View>
                                            <List >
                                            {
                                                Object.entries(fetchReducer.data.walkStacks).map((obj,i)=>
                                                <ListItem title={obj[0]+' : '+obj[1]} hideChevron={true} key={i}/>
                                                )
                                            }
                                            </List>
                                            
                                </View> 
                            </ScrollView>
                            }
                {/*    <View style = {{flex:1}}></View>   */}
                  
        </View>
        );
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
    marginLeft:0,
    marginRight:0,
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center',
    
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile)