import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import firebase from '../../config/firebase';
import { updateLocale } from 'moment';
class Achievement extends Component{
constructor(props){
    super(props);
    this.state={
        achieve:{}
    }
}
    componentDidMount(){
        this.setState({
            ...this.props.authReducer.data
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
             if (prevProps.authReducer.data != this.props.authReducer.data) {
                 this.setState({
                     ...this.props.authReducer.data
                 })
             }
         }

     getUrlImage(path){
        var result = 'https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1';
        return result
    } 

    render(){
        const {authReducer} = this.props
        
        return <View style={styles.container}>
            <Text>Your Achievement</Text>
            <Image style={{width: 50, height: 50}}
          source = {
              {
                  uri: this.getUrlImage("achieve/icon.png")
              }
          }
        />
            {
            authReducer.isAuth && Object.values(this.state.achieve).map((obj,i) =>
            <View key={i}>
                <Text>Name: {obj.name}</Text>
                <Text>Detail: {obj.detail}</Text>
                <Text>Time: {obj.time}</Text>
                <Text>star: {obj.star}</Text>
{/*                 <Image style={{width: 50, height: 50}}
          source = {
              {
                  uri: this.getUrlImage("achieve/icon.png") //obj.path
              }
          }
        /> */}
                <Text> </Text>
            </View>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Achievement)