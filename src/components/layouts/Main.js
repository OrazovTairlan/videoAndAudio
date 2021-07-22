import React, {Component} from 'react';
import Introduction from "./Introduction";
import Devices from "./Devices";
import Description from "./Description";
import Questions from "./Questions";
import Device from "./Device";
import Testing from "./Testing";

class Main extends Component {
    state = {
        Introduction: true,
        Devices: false,
        Questions: false
    };
    render() {
        const {children} = this.props;
        return (
            <div className="main">
                <div className="container">
                    {children}
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Questions/>
                </div>
            </div>
        );
    }
}

export default Main;