import React, {Component} from 'react';
import Introduction from "./Introduction";
import Devices from "./Devices";
import Description from "./Description";

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