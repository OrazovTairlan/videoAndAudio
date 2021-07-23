import React, {Component} from 'react';
import Introduction from "./Introduction";
import Devices from "./Devices";
import Description from "./Description";
import Questions from "./Questions";
import Device from "./Device";
import Testing from "./Testing";
import {observer} from "mobx-react";
import Store from "../../store/store";
class Main extends Component {
    handleComponents = (param) => {
        switch (param) {
            case "Introduction":
                return <Introduction/>;
            case "Description":
                return <Description/>;
            case "Devices":
                return <Devices/>;
            case "Questions":
                return <Questions/>;
        }
    };
    render() {
        const {children} = this.props;
        return (
            <div className="main">
                <div className="container">
                    {children}
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    {this.handleComponents(Store.currentComponent)}
                </div>
            </div>
        );
    }
}

export default observer(Main);