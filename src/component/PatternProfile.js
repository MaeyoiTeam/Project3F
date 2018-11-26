import React, { Component } from 'react'
import { Text, View, Image, StyleSheet} from 'react-native'
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { Button, Avatar, List, ListItem } from 'react-native-elements';
export class PatternProfile extends Component {

  render() {
      const {data} =this.props;
      const {food,walk,rest}= data.levelQ;
    return (
        <View style={styles.container}>
            <Text style={styles.a1}>Profile</Text>
                <Avatar large rounded source={{ uri: data.photoURL }} onPress={() => console.log("Works!")} />
                <Text style={styles.ki}>
                    {data.displayName}
                </Text>
                <View style={{ flexDirection: "row", flex: 0.4 }}>
                <Image source={require("../../image/star.png")} fadeDuration={0} style={{ width: 25, height: 25}} />
                    <Text
                        style={{
                            textAlign: "center",
                            paddingTop: 5,
                            fontFamily: "asd"
                        }}
                    >
                        X {data.star}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{ fontFamily: "asd", textAlign: "center" }}
                    >
                        Level:{walk.level}
                    </Text>
                    <View style={{ padding: 5, flexDirection: "row", flex: 0.25 }}>
                        <Image source={require("../../image/steps.png")} fadeDuration={0} style={{ width: 25, height: 25, right: 10 }} />
                        <ProgressBarAnimated width={200} backgroundColor="#6CC644" value={(data.levelQ.walk.star * 100) / data.levelQ.walk.target} />
                        <Text style={{ fontFamily: "asd", left: 10, fontSize: 12 }}>
                            {walk.star}/{walk.target}
                        </Text>
                    </View>
                    <Text
                        style={{ fontFamily: "asd", textAlign: "center" }}
                    >
                        Level:{food.level}
                    </Text>
                     <View style={{ padding: 5, flexDirection: "row", flex: 0.25 }}>
                        <Image source={require("../../image/food2.png")} fadeDuration={0} style={{ width: 25, height: 25, right: 10 }} />
                        <ProgressBarAnimated width={200} backgroundColor="#6CC644" value={(data.levelQ.food.star * 100) / data.levelQ.food.target} />
                        <Text style={{ fontFamily: "asd", left: 10, fontSize: 12 }}>
                            {food.star}/{food.target}
                        </Text>
                    </View> 
                    <Text
                        style={{ fontFamily: "asd", textAlign: "center" }}
                    >
                        Level:{rest.level}
                    </Text>
                    <View style={{ padding: 5, flexDirection: "row", flex: 0.25 }}>
                        <Image source={require("../../image/yoga.png")} fadeDuration={0} style={{ width: 25, height: 25, right: 10 }} />
                        <ProgressBarAnimated width={200} backgroundColor="#6CC644" value={(data.levelQ.rest.star * 100) / data.levelQ.rest.target} />
                        <Text style={{ fontFamily: "asd", left: 10, fontSize: 12 }}>
                            {rest.star}/{rest.target}
                        </Text>
                    </View>
                </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'asd'
    },
    ki: {
        paddingTop: 10,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'asd'
    },
    a1: {
        fontFamily: 'asd',
        fontSize: 25,
        paddingTop: 15
    },
    ko: {
        paddingTop: 15
    }

});
export default PatternProfile
