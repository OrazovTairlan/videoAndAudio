import React, {Component} from 'react';
import Introduction from "./Introduction";
import Devices from "./Devices";
import Description from "./Description";
import Questions from "./Questions";
import Device from "./Device";

class Main extends Component {
    render() {
        const {children} = this.props;
        return (
            <div className="main">
                <div className="container">
                    {children}
                    <Description/>
                </div>
            </div>
        );
    }
}

export default Main;