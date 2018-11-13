import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';


class Profile extends Component{
    
    

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
                <Avatar xlarge rounded source={{ uri: authReducer.data.photoURL }} onPress={() => console.log("Works!")} />
                <Text style={{paddingTop:20,fontSize:15}}>{authReducer.data.displayName}</Text>
                <Text>{authReducer.data.Email}</Text>
{/* //TODO แสดง เลเวล ค่าประสบการณ์ Objectที่เก็บข้อมูล = authReducer.data.levelQ */}
                <Text style={{paddingBottom:70,textAlign:'center',paddingTop:60}}>Level:</Text>
                <Button title="Achievement Earned" 
                    onPress={async ()=>{let path = await this.randomQ();
                    this.props.navigation.navigate(path);}}
                    buttonStyle={{
                        backgroundColor: "rgba(00, 99,216, 1)",
                        width: 120,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                       
                      }}  
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)