import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import {fetchProfile} from '../../actions';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

class OtherProfile extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.navigation.state.params.data,
        }
    }
    render(){
        const {authReducer,fetchReducer} = this.props;
        const {name,photoURL,star,levelQ} =this.state;
        console.log(this.state)
        return(<View style={styles.container}>
                 <Avatar xlarge rounded source={{ uri: photoURL }} onPress={() => console.log("Works!")} />
                <Text style={{paddingTop:20,fontSize:15,textAlign:'center'}}>{name}</Text>
                <Text>Star:{star}</Text>
                 <Text style={{textAlign:'center',paddingTop:10,paddingBottom:30,left:100}}> X Star : {star}</Text>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row'
                    }}>
                <Image
                 source={require('../../../image/steps.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                />
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
                 style={{width: 25, height: 25,right:10}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(levelQ.food.star*100)/levelQ.food.target}/>
                <Text style = {{left:10}}>{levelQ.food.star}/{levelQ.food.target}</Text>         
                </View>
                <Text>Level:{levelQ.food.level}</Text>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row'
                    }}>
                <Image
                 source={require('../../../image/yoga.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(levelQ.rest.star*100)/levelQ.rest.target}/>
                <Text style = {{left:10}}>{levelQ.rest.star}/{levelQ.rest.target}</Text>   
                </View>
                <Text>Level:{levelQ.rest.level}</Text>
                <View style = {{paddingTop:10}}>
                </View>
                <View style = {{paddingTop:10}}>
                <Button title="Achievement Earned" 
                    disabled
                    onPress={()=>this.props.navigation.navigate("History")}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 200,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        left:15
                      }}  
                />
                </View> 
        </View>);
    }
}


// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    fetchReducer: state.authReducer
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
    fetchProfile
};
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white',  
    alignItems: 'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile)