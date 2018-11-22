import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

class OtherProfile extends Component {
    
    constructor(props) {
        super(props);
    }

    render(){
        const {fetchReducer} = this.props;
         const {displayName,photoURL,star,levelQ} =fetchReducer.data
        console.log(fetchReducer.data.levelQ);
        return(<View style={styles.container}>
                  <Avatar xlarge rounded source={{ uri: photoURL }} onPress={() => console.log("Works!")} />
            <Text style={{ paddingTop: 20, fontSize: 15, textAlign: 'center' }}>{displayName}</Text>
                <Text>Star:{star}</Text>
               <Text style={{textAlign:'center',paddingTop:10,paddingBottom:30,left:100}}> X Star : {star}</Text>
                {
                    fetchReducer.data.levelQ!=null &&
                <View>
                    <View style={{
                        padding: 5,
                        flexDirection: 'row'
                    }}>
                        <Image
                            source={require('../../../image/steps.png')}
                            fadeDuration={0}
                            style={{ width: 25, height: 25, right: 10 }}
                        />
                        <ProgressBarAnimated width={200}
                            backgroundColor="#6CC644"
                            value={(levelQ.walk.star * 100) / levelQ.walk.target} />
                        <Text style={{ left: 10 }}>{levelQ.walk.star}/{levelQ.walk.target}</Text>
                    </View>
                    <Text>Level:{levelQ.walk.level}</Text>
                    <View style={{
                        padding: 5,
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
                            source={require('../../../image/yoga.png')}
                            fadeDuration={0}
                            style={{ width: 25, height: 25, right: 10 }}
                        />
                        <ProgressBarAnimated width={200}
                            backgroundColor="#6CC644"
                            value={(levelQ.rest.star * 100) / levelQ.rest.target} />
                        <Text style={{ left: 10 }}>{levelQ.rest.star}/{levelQ.rest.target}</Text>
                    </View>
                    <Text>Level:{levelQ.rest.level}</Text>
                    <View style={{ paddingTop: 10 }}>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Button title="Achievement Earned"
                            onPress={() => this.props.navigation.navigate("History",{uid:fetchReducer.data.uid})}
                            buttonStyle={{
                                backgroundColor: "rgba(00, 99,216, 1)",
                                width: 200,
                                height: 40,
                                borderColor: "transparent",
                                borderWidth: 0,
                                left: 15
                            }}
                        />

                    </View>
                </View>
                }
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