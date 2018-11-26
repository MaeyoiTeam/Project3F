import React,{Component} from 'react';
import { StyleSheet,View,Text,Alert} from 'react-native';
import { connect } from 'react-redux';
import {Avatar,Badge} from 'react-native-elements';
import {fetchUser} from '../../actions/signIn';
import {getQuestList} from '../../actions/quest';
import {navigate} from '../../actions'

class MidComponent extends Component {
    constructor(props){
        super(props);
        this.easter9=this.easter9.bind(this);
       this.state={
           num:0
       }
    }

    componentWillMount(){
        this.props.getQuestList(this.props.authReducer.data.uid, "over")
    }

    componentDidUpdate(){
        if (this.props.modal.showModal){
            this.props.navigate("ModalScreen");
        }
    }

    easter9=()=>{
        if(this.state.num>=9){Alert.alert('BELIEVE!!!!!',
            'Nine9Belive',
            [
                {text: 'Press for Believe'},
            ],
            { cancelable: false });
        this.setState({num:0})}
        else{this.setState({num:this.state.num+1})}
    }

    render(){

        return(
                <View style={styles.container}>
                <Text style = {{fontFamily:'asd',color:'#000066',fontSize:18}}>ACHIEVE</Text>
                <Text style = {{fontFamily:'asd',color:'#FF3300',fontSize:18}}>4</Text>
                <Text style = {{fontFamily:'asd',color:'#000066',fontSize:18}}>YOURSELF</Text> 
                 {/*  <Badge onPress={() => {this.easter9()}} value="ACHIEVE" /> */}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})


const mapStateToProps = (state) => ({
    modal:state.modalReducer,
    fetchReducer: state.fetchReducer,
    authReducer: state.authReducer,
    nav:state.nav
});
//Used to add dispatch (action) into props
const mapDispatchToProps={
  fetchUser, getQuestList,navigate
};

export default connect(mapStateToProps, mapDispatchToProps)(MidComponent)