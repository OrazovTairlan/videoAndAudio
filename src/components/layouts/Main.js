import React, {Component} from 'react';
import Introduction from "./Introduction";
import Devices from "./Devices";
import Questions from "./Questions";
import Testing from "./Testing";

class Main extends Component {
    render() {
        const {children} = this.props;
        return (
            <div className="main">
                <div className="container">
                    {children}
                    <Questions/>
                </div>
            </div>
        );
    }
}

export default Main;