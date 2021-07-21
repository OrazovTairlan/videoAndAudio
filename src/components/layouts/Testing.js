import React, {Component} from 'react';
import Introduction from "./Introduction";
import Header from "./Header";

class Testing extends Component {
    state = {
        component: false
    }
    render() {
        const {component} = this.state;
        return (
            <div>
                <button onClick={()=>this.setState({component: !component})}>asdasdasd</button>
                {component ? <Header/>:<Introduction/>}
            </div>
        );
    }
}

export default Testing;