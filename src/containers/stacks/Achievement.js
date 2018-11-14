import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import firebase from '../../config/firebase';
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

     getUrlImage=(path)=>{
        var storage = firebase.storage();
        var Ref = storage.child(path).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
        }).catch(function (error) {
            // Handle any errors
        });
        return Ref;
    } 

    render(){
        const {authReducer} = this.props
        
        return <View style={styles.container}>
            <Text>Your Achievement</Text>
            <Image style={{width: 50, height: 50}}
          source = {
              {uri:'https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1'}
          }
        />
            {
            authReducer.isAuth && Object.values(this.state.achieve).map((obj,i) =>
            <View key={i}>
                <Text>Name: {obj.name}</Text>
                <Text>Detail: {obj.detail}</Text>
                <Text>Time: {obj.time}</Text>
                <Text>star: {obj.star}</Text>
                <Image style={{width: 50, height: 50}}
          source = {
              {
                  uri: this.getUrlImage(obj.path) || 'https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1'
              }
          }
        />
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