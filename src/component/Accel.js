import React,{Component} from 'react'
import { Text,View } from 'react-native'
import { Accelerometer } from 'expo';
class Accel extends Component{
    constructor(props){
        super(props);
        this.state={
            isAlert:false,
            accelerometerData: {
                x:0,
                y:0,
                z:0
            },
        }
    }
     componentDidMount() {
         this._toggle();
     }
    componentWillUnmount() {
         this._unsubscribe();
    }
    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    }
    _subscribe = () => {
        this._subscription = Accelerometer.addListener(accelerometerData => {
            let { x, y, z } = this.state.accelerometerData; 
            if(x>=0.5||y>=0.5||x<=-0.5){
                this.props.isAlert(true)
                this.setState({
                    isAlert:true,
                    accelerometerData
                });
            }
            else{
                this.setState({
                    isAlert: false,
                    accelerometerData
                });
            }
        });
    }

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    }
    render(){
        let { x, y, z } = this.state.accelerometerData; 
        return( <View>
            {this.state.isAlert && <Text style = {{textAlign:'center'}}>ตาวิเศษรู้นะ วางโทรศัพท์ซะ</Text>}
        </View> );
    }
}
     function round(n) {
        if (!n) {
            return 0;
        }

        return Math.floor(n * 100) / 100;
    } 

export default Accel;