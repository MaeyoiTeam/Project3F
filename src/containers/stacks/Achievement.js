import { View,Text,StyleSheet,Image,ScrollView } from 'react-native';
import React,{Component} from 'react';
import { connect } from "react-redux";
import { Button, Avatar } from 'react-native-elements';
import firebase from '../../config/firebase';
import { fetchAchievement, clearMiddleHistory} from '../../actions/'
class Achievement extends Component {
  constructor(props) {
    super(props);
    /* this.getUrlImage = this.getUrlImage.bind(this); */
    this.state = {
      showImg: false,
      achieve: {}
    };
  }
  componentWillMount() {
      this.props.fetchAchievement(this.props.navigation.state.params.uid);
  }

  componentWillReceiveProps=(nextProps)=> {
    this.setState({
        achieve: nextProps.historyReducer.data
    });
  }
  componentWillUpdate = (nextProps, nextState) => {
      this.getUrlImage(nextProps.historyReducer.data);
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.historyReducer.data != this.props.historyReducer.data) {
      this.setState({
        achieve: this.props.historyReducer.data
      });
    }
  }
  componentWillUnmount() {
    this.props.clearMiddleHistory();
  }

  getUrlImage(achievelist) {
    if (achievelist != null) {
      Object.entries(achievelist).forEach(achieve => {
        if (achieve[1].path != null) {
          if (!achieve[1].path.includes("firebase")) {
            var sRef = firebase.storage().ref("achieve/" + achieve[1].path);
            sRef.getDownloadURL().then(url => {
              achieve[1].path = url;
              this.setState({
                showImg: true,
                achieve: {
                  [achieve[0]]: achieve[1],
                  ...this.state.achieve
                }
              });
            }).catch((e)=>{
              achieve[1].path = "https://firebasestorage.googleapis.com/v0/b/project3f-4a950.appspot.com/o/achieve%2Ficon.png?alt=media&token=e95c5c83-7b5c-4db3-96f7-258b06b925a1";
              this.setState({
                showImg: true,
                achieve: {
                  [achieve[0]]: achieve[1],
                  ...this.state.achieve
                }
              });
            })
          }
        }
      });
    }
  }

  render() {
    const { historyReducer } = this.props;
    // console.log(this.state.achieve);
    return <ScrollView><View style={styles.container}>
        
        {historyReducer.haveHISTORY && Object.values(this.state.achieve).map(
            (obj, i) => {
              return (
                <View key={i}>
                  <View style = {{alignItems:'center', paddingTop: 10, paddingBottom: 10}}>
                  {this.state.showImg ? (
                    <Image
                      style={{ width: 50, height: 50, alignItems:'center' }}
                      source={{ uri: obj.path }}
                    />
                  ) : (
                    <Image
                      style={{ width: 50, height: 50, alignItems:'center' }}
                      source={require("../../../image/icon.png")}
                    />
                  ) //Temp Imag
                  }
                  </View>
                  <Text style = {{fontFamily: 'asd', paddingLeft: 10, textAlign: 'center'}}>Name : {obj.name}</Text>
                  <Text style = {{fontFamily: 'asd', paddingLeft: 10, textAlign: 'center'}}>Detail : {obj.detail}</Text>
                  <Text style = {{fontFamily: 'asd', paddingLeft: 10, textAlign: 'center'}}>Time : {obj.time}</Text>
                  <Text style = {{fontFamily: 'asd', paddingLeft: 10, textAlign: 'center'}}>star : {obj.star}</Text>
                  <View key={i} style = {styles.separator}></View>
                </View>
              );
            }
          )}
      </View></ScrollView>;
  }
}

// Used to add reducer's states into the props
const mapStateToProps = state => ({
  historyReducer: state.historyReducer,
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
  fetchAchievement, clearMiddleHistory
};
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: 'white', 
     
    
  },
  separator: {
    marginVertical: 10,
    borderWidth: 1,
    width:400,
    borderColor: '#DCDCDC',
    alignItems:'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Achievement)