import { View,Text,StyleSheet,Image } from 'react-native';
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
                console.log(e)
                this.setState({
                    showImg: false
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
    return (
      <View style={styles.container}>
        <Text>Your Achievement</Text>
        {this.state.achieve != null &&
          Object.values(this.state.achieve).map((obj, i) => {
            return (
              <View key={i}>
                <Text>Name: {obj.name}</Text>
                <Text>Detail: {obj.detail}</Text>
                <Text>Time: {obj.time}</Text>
                <Text>star: {obj.star}</Text>
                {this.state.showImg ? (
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: obj.path }}
                  />
                ) : (
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../../image/icon.png")}
                  />
                ) //Temp Imag
                }
                <Text> </Text>
              </View>
            );
          })}
      </View>
    );
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
    alignItems: 'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Achievement)