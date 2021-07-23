import React, {Component} from 'react';
import Introduction from "./Introduction";
import Header from "./Header";
import Description from "./Description";

class Testing extends Component {
    // state = {
    //     component: false
    // // }
    state ={
        component: true
    }
    // [introduction, devices, description, questions]
    render() {
        const {component} = this.state;
        return (
            <div>
                <button onClick={()=>this.setState({component: !component})}>asdasdasd</button>
                {component ? <Introduction/>:<Description/>}
            </div>
        );
    }
}

export default Testing;