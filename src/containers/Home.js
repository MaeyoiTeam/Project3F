import { View,Text,StyleSheet,Image, } from 'react-native';
import React,{Component} from 'react';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux';
import { randomQuest,getQuestList,fetchQuest } from '../actions/quest'
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            questlist:{},
            haveQuest:false
        }
        this.randomQ = this.randomQ.bind(this);
        this.goToQuest = this.goToQuest.bind(this);
        this.chooseColor=this.chooseColor.bind(this);
    }
    a
    onSlideRight = () => {
        //perform Action on slide success.
    };

    componentWillMount() {
        this.props.getQuestList(this.props.authReducer.data.uid, "undone")
       
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
         if (prevProps.questReducer.data != this.props.questReducer.data) {
             this.setState({
                 questlist:this.props.questReducer.data,
                 haveQuest:this.props.questReducer.haveQuest
                 })
         }
    }

    randomQ(){
           this.props.randomQuest(this.props.authReducer.data).then(()=>{
               if (this.props.authReducer.isAuth) {
                this.props.getQuestList(this.props.authReducer.data.uid, "undone")
               } 
           })
    } 

    goToQuest(info){
        this.props.fetchQuest(this.props.authReducer.data.uid, info[0], "undone");
        let path = 'Home';
        switch (info[1].type) {
            case "food": path = 'Quest';
                break;
            case "walk": path = 'QuestWalk';
                break;
            case "rest": path = "QuestRest";
                break;
            default: path = "Home";
        }
        this.props.navigation.navigate(path);
    }

    chooseColor(type){
        switch (type) {
            case 'walk':    return '#330066'
            case 'food':    return '#FF6347'
            case 'rest':    return '#32CD32'
        }
    }

    render(){
        const {authReducer,questReducer} = this.props;
        const {haveQuest,questlist} = this.state
        if(authReducer.isAuth){
            if(questReducer.haveQuest){
                return(
                    
                    <View>
                        
                {    haveQuest &&   questlist.map((info, i) =>{
                    
                    switch (info[1].type) {
                        case "walk":return(<View key={i} style = {styles.separator}>
                            <Text style = {{textAlign:'center',fontSize:20,paddingTop:20,fontFamily:'asd'}}>{info[1].name}</Text>
                            <Text style = {{textAlign:'center',fontSize:15,paddingBottom:10,fontFamily:'asd'}}>type: {info[1].type}</Text>
                            
                            <Button title={"Play Walk"}
                            buttonStyle={{
                                backgroundColor: this.chooseColor(info[1].type),
                                height:50,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius:360,
                                }}
                            textStyle={{fontFamily:'asd',fontSize:16,color:'#ffffff'}}
                            onPress = {
                                    () => {
                                        this.props.fetchQuest(authReducer.data.uid,info[0],"undone");
                                        let path='Home';
                                        switch(info[1].type){
                                            case "food": path='Quest'; 
                                                            break;
                                            case "walk": path='QuestWalk';
                                                            break;
                                            case "rest": path="QuestRest";
                                                            break;
                                            default: path="Home";
                                        }
                                        this.props.navigation.navigate(path);
                                    }
                                    
                            }
                            />
                        </View>);
                    
                        default:return(<View key={i} style = {styles.separator}>
                            <Text style = {{textAlign:'center',fontSize:20,paddingTop:20,fontFamily:'asd'}}>{info[1].name}</Text>
                            <Text style = {{textAlign:'center',fontSize:15,paddingBottom:10,fontFamily:'asd'}}>type: {info[1].type}</Text>
                            
                            <Button title={"Play "+info[1].name}
                            buttonStyle={{
                                backgroundColor: this.chooseColor(info[1].type),
                                height:50,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius:360,
                                }}
                            textStyle={{fontFamily:'asd',fontSize:16,color:'#ffffff'}}
                            onPress = {
                                    () => {
                                        this.props.fetchQuest(authReducer.data.uid,info[0],"undone");
                                        let path='Home';
                                        switch(info[1].type){
                                            case "food": path='Quest'; 
                                                            break;
                                            case "walk": path='QuestWalk';
                                                            break;
                                            case "rest": path="QuestRest";
                                                            break;
                                            default: path="Home";
                                        }
                                        this.props.navigation.navigate(path);
                                    }
                                    
                            }
                            />
                         
                        </View>)
                    }
                })
                }          
                    </View>
                );
            }
            else{
                return(
            <View style={styles.container}>
                    <View style={styles.ku1}></View>
                <View style={styles.kuko}>
                <Image 
                 source={require('../../image/steps.png')}
                 fadeDuration={0}
                 style={{width: 100, height: 100,right:10}}
                />
                <Image
                 source={require('../../image/food2.png')}
                 fadeDuration={0}
                 style={{width: 100, height: 100}}
                 />
                <Image
                 source={require('../../image/yoga.png')}
                 fadeDuration={0}
                 style={{width: 100, height: 100,left:10}}
                />
                </View>
                    <View style={styles.kuka}></View>
                    <View style={styles.kuku}>
                        <Text style = {{textAlign:'center',fontSize:13.5,color:'#7a7a7a'}}>You can lies to others, but you can not lie to yourself.</Text>
                        <Text style = {{textAlign:'center',fontSize:13.5,color:'#7a7a7a'}}>- Just be honest. -</Text>
                                            
                    </View>
                    <View style={styles.ku2}>
                        <RNSlidingButton
                            style={{
                            width: 325,
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: '#7a7a7a',
                            borderRadius: 360
                             }}
                            height={45}
                            onSlidingSuccess={async ()=>{let path = await this.randomQ();
                                this.props.navigation.navigate(path);}}
                                slideDirection={SlideDirection.RIGHT}>
                            <View>
                                <Text numberOfLines={1} style={styles.titleText}>
                                    SLIDE RIGHT TO GET QUESTS >>
                                </Text>
                            </View>
                        </RNSlidingButton>
 
                    </View>
            </View>
        );
            }
        }
        else{
          return <Text>Signing...</Text>
        }
    }
}
// Used to add reducer's states into the props
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
    questReducer:state.questReducer
})
const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: '#fcfcf7',  
    alignItems: 'center'
  },
    
    ku1: {
       
      flex: 0.1,
    },
    ku2: {
      
      flex: 0.2,
    },
    ku3: {
      
      flex: 0.2,
    },
    kuku: {
        
        flex: 0.55,
    },
    kuka: {
        
        flex: 0.1,
    },
    kuko:  {
        
        flexDirection: 'row'
    },
    separator: {
        paddingBottom: 10,
        marginVertical: 10,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
    titleText: {
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#7a7a7a'
    }
});
//Used to add dispatch (action) into props
const mapDispatchToProps = {
     getQuestList, randomQuest, fetchQuest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)