import { View,Text,StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import firebase from '../../config/firebase';
class Achievement extends Component{
constructor(props){
    super(props);
    this.getUrlImage = this.getUrlImage.bind(this);
    this.state={
        achieve:{}
    }
}
    componentDidMount(){
        this.setState({
            ...this.props.authReducer.data
        })
        this.getUrlImage(this.props.authReducer.data.achieve);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
             if (prevProps.authReducer.data != this.props.authReducer.data) {
                 this.setState({
                     ...this.props.authReducer.data
                 })
                 this.getUrlImage(this.props.authReducer.data.achieve);
             }
         }

     getUrlImage(achievelist){
        if (achievelist!=null){
                 Object.entries(achievelist).forEach(achieve => {
                        if(achieve[1].path!=null){
                            if (!achieve[1].path.includes("firebase")) {
                                var sRef = firebase.storage().ref("achieve/" + achieve[1].path);
                                sRef.getDownloadURL().then((url) => {
                                    achieve[1].path = url;
                                    this.setState({
                                        achieve: {
                                            [achieve[0]]: achieve[1],
                                            ...this.state.achieve
                                        }
                                    })
                                })
                            }
                        }
                }); 
        }
    } 

    render(){
        const {authReducer} = this.props
        return <View style={styles.container}>
            <Text>Your Achievement</Text>
            {
            authReducer.data.achieve!=null && Object.values(this.state.achieve).map((obj,i) =>
            {
                return <View key={i}>
                            <Text>Name: {obj.name}</Text>
                            <Text>Detail: {obj.detail}</Text>
                            <Text>Time: {obj.time}</Text>
                            <Text>star: {obj.star}</Text>
                            {   <Image style={{width: 50, height: 50}}
                                source = {{uri: obj.path}}/>
                            }
                            <Text> </Text>
                        </View>
            })
            }
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