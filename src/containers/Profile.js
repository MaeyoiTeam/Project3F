import { View,Text,StyleSheet } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';


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
              borderRadius: 4,
              borderWidth: 0.5,
              borderColor: '#d6d7da',
              alignItems: 'center'
            },
            title: {
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            },
            activeTitle: {
              color: 'red',
            },
          });
        const {authReducer} = this.props
        
        return <View style={styles.container}>
            <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>Your Profile</Text>
            {authReducer.isAuth && <View>
                <Avatar style = {styles.litle} xlarge rounded source={{ uri: authReducer.data.photoURL }} onPress={() => console.log("Works!")} />
                <Text>{authReducer.data.displayName}</Text>
                <Text>{authReducer.data.Email}</Text>
                <Text>Star:{authReducer.data.star}</Text>
{/* //TODO แสดง เลเวล ค่าประสบการณ์ Objectที่เก็บข้อมูล = authReducer.data.levelQ */}
                 <Text>Your Score</Text>
                     {
                         this.current!=null &&<View>
                          <Text>Rank: {this.current.index+1} : {this.current.data.name}</Text>
                        <Text>     Star:  {this.current.data.star}</Text>
                         </View>
                      }
                <Text style = {styles.litle} >Level:</Text>
                <Text style = {styles.litle} >Experience</Text>
                <Text>Achievement</Text>
                {
                    authReducer.data.achieve &&
                    authReducer.data.achieve.map((obj,i) =>
                        <Text key={i}>{i} : {obj}</Text>
                    )
                }
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