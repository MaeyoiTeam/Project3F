import React,{Component} from 'react'
import {List,FlatList} from 'react-native'

class ListCom extends Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.targetSteps)
        return(<List>
           {/*  <FlatList
                            data={this.props.targetSteps}
                            renderItem={(item) => 
                                (
                                    <ListItem
                                        title={item[1].name}
                                        subtitle={item[1].star}
                                    />
                                    )
                            }
                        /> */}
        </List>);
    }
}

export default ListCom