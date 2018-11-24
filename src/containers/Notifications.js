import { View, Text, StyleSheet, Button} from 'react-native';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getNotifications,updateNotification} from '../actions/notification'
import Loading from '../component/Loading';

const moment = require('moment');
class Notifications extends Component {
    state = {
        progress: 20,
        progressWithOnComplete: 0,
        progressCustomized: 0,
      }
    
      increase = (key, value) => {
        this.setState({
          [key]: this.state[key] + value,
        });
      }

    static navigationOptions = () => ({
 
  });

  componentWillMount(){
    this.props.getNotifications(this.props.authReducer.data.uid);
  }
  


    render(){
      const {notification} =this.props;
      console.log(this.props.uid)
      if (notification.haveNotification&&!notification.isFetching) {
          return (
            <View style={styles.container}>
              {
                              this.props.notification.haveNotification &&
                this.props.notification.data.sort((a, b) => -1).map((obj, i) => <View key={i} style = {styles.separator}>
                  <Text style = {{fontFamily:'asd', fontSize:12, color:'#000000', paddingLeft:10}}>{obj.title}</Text>
                  <Text style = {{fontFamily:'asd', fontSize:18, color:'#000000', paddingLeft:10}}>{obj.body}</Text>
                  <Text style = {{fontFamily:'asd', fontSize:10, color:'#565656' ,textAlign:'right', paddingRight:10}}>{moment(obj.date).fromNow()}</Text>
                  
                </View>
               )
              }
            </View>
            
          );
      } else{
          return (<Loading />);
        }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcf7',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
  separator: {
    backgroundColor:'#fff3e0',
    paddingBottom: 5,
    paddingTop: 10,
    borderWidth: 0.5,
    borderColor: '#fff3e0',
    marginTop: 5
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
});
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
  notification: state.notification,
  authReducer: state.authReducer
});

//Used to add dispatch (action) into props
const mapDispatchToProps = {
  getNotifications, updateNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)