import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Font } from 'expo';


class Profile extends Component{

    
         componentDidUpdate(prevProps, prevState, snapshot) {
             if (prevProps.authReducer.data != this.props.authReducer.data) {
                 this.setState({
                     ...this.props.authReducer.data
                 })
             }
         }

         
         

         

    render(){
        const styles = StyleSheet.create({
            container: {
              alignItems: 'center'
            },
            title: {
              fontSize: 30,
              textAlign: 'center',
              fontFamily:'asd'
            },
            ki:{
                paddingTop:20,
                fontSize:15,
                textAlign:'center',
                fontFamily:'asd'
            },
         
          });
        const {authReducer} = this.props
        const {food,walk,rest}= authReducer.data.levelQ;
        
        return <View style={styles.container}>
            <Text style = {{fontFamily:'asd',paddingTop:20,paddingBottom:10,fontSize:25}}>Your Profile</Text>
            {authReducer.isAuth && <View>
                <Avatar containerStyle = {{left:90}} large rounded source={{ uri: authReducer.data.photoURL }} onPress={() => console.log("Works!")} />
                <Text style={styles.ki}>{authReducer.data.displayName}</Text>
                <Text>{authReducer.data.Email}</Text>
                
{/* //TODO แสดง เลเวล ค่าประสบการณ์ Objectที่เก็บข้อมูล = authReducer.data.levelQ */}
                <View style = {{                  
                    flexDirection: 'row'
                    }}>
                <Image
                 source={require('../../image/star.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,left:90}}
                />    
                <Text style={{textAlign:'center',paddingTop:10,paddingBottom:20,left:100}}> X  {authReducer.data.star  }</Text>
                </View>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row'
                    }}>
                <Image
                 source={require('../../image/steps.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(authReducer.data.levelQ.walk.star*100)/authReducer.data.levelQ.walk.target}/>
                <Text style = {{left:10}}>{walk.star}/{walk.target}</Text> 
                </View>
                <Text style = {{fontFamily:'asd'}}>Level:{walk.level}</Text>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row'
                    }}>
                <Image
                 source={require('../../image/food2.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(authReducer.data.levelQ.food.star*100)/authReducer.data.levelQ.food.target}/>
                <Text style = {{left:10}}>{food.star}/{food.target}</Text>         
                </View>
                <Text style = {{fontFamily:'asd'}}>Level:{food.level}</Text>
                <View style = {{
                    padding:5, 
                    flexDirection: 'row'
                    }}>
                <Image
                 source={require('../../image/yoga.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25,right:10}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColor = "#6CC644"
                value = {(authReducer.data.levelQ.rest.star*100)/authReducer.data.levelQ.rest.target}/>
                <Text style = {{left:10}}>{rest.star}/{rest.target}</Text>   
                </View>
                <Text style = {{fontFamily:'asd'}}>Level:{rest.level}</Text>
                <View style = {{paddingTop:20}}>
                <Button title="Achievement Earned" 
                    onPress={()=>this.props.navigation.navigate("History")}
                    buttonStyle={{
                        backgroundColor: "#004200",
                        width: 200,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        left:15
                      }}
                      style = {{fontFamily:'asd'}}  
                />
                </View>
              </View>}
          </View>;
    }
}

// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)