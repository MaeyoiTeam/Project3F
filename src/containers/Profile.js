import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


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
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'asd'
            },
           
          });
        const {authReducer} = this.props
        
        return <View style={styles.container}>
            <Text style = {{fontFamily:'asd',fontSize:30,fontWeight:'bold'}}>Your Profile</Text>
            {authReducer.isAuth && <View>
                <Avatar containerStyle = {{left:80}} large rounded source={{ uri: authReducer.data.photoURL }} onPress={() => console.log("Works!")} />
                <Text style={{paddingTop:20,fontSize:15,textAlign:'center'}}>{authReducer.data.displayName}</Text>
                <Text>{authReducer.data.Email}</Text>
                <Text>Star:{authReducer.data.star}</Text>
{/* //TODO แสดง เลเวล ค่าประสบการณ์ Objectที่เก็บข้อมูล = authReducer.data.levelQ */}
                <Text style={{textAlign:'center',paddingTop:10,paddingBottom:30}}>Level:</Text>
                
                <View style = {{padding:5, flexDirection: 'row'}}>
                <Image
                 source={require('../../image/steps.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25}}
                />
                <ProgressBarAnimated width = {200}
                backgroundColorOnComplete="#6CC644"
                value = {80}/>
                </View>
                <View style = {{padding:5, flexDirection: 'row'}}>
                <Image
                 source={require('../../image/food2.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColorOnComplete="#6CC644"
                value = {30}/>
                </View>
                <View style = {{padding:5, flexDirection: 'row'}}>
                <Image
                 source={require('../../image/meditation.png')}
                 fadeDuration={0}
                 style={{width: 25, height: 25}}
                 />
                <ProgressBarAnimated width = {200}
                backgroundColorOnComplete="#6CC644"
                value = {50}/>
                </View>
                <View style = {{paddingTop:10}}>
                <Button title="Share Now!" 
                    buttonStyle={{
                        backgroundColor: "rgba(10, 10,100, 1)",
                        width: 120,
                        height: 30,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius:360,
                        left:30
                      }}  
                />
                </View>
                <View style = {{paddingTop:10}}>
                <Button title="Achievement Earned" 
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 200,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        left:-10
                      }}  
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