import React, {Component} from 'react';
import Introduction from "./Introduction";
import Devices from "./Devices";

class Main extends Component {
    render() {
        const {children} = this.props;
        return (
            <div className="main">
                <div className="container">
                    {children}
                    <Devices/>
                </div>
            </div>
        );
    }
}

export default Main;