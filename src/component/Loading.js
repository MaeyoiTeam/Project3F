import React, { Component } from 'react'
import {Text,View,StyleSheet,AppRegistry,ProgressBarAndroid } from 'react-native'
export class Loading extends Component {
  render() {
    return (
        <View style={styles.container}>
               <ProgressBarAndroid
          styleAttr="Large"
          indeterminate={true}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        padding: 10
    }
});
export default Loading
