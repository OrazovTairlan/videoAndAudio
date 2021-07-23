import React, {Component} from 'react';
import "../../App.css"
import Store from "../../store/store";
import {observer} from "mobx-react";
import Device from "./Device";
import Devices from "./Devices";
import Introduction from "./Introduction";

class ButtonBack extends Component {
    render() {
        const {name} = this.props;
        return (
            <div className="back" onClick={() => {
                switch (Store.currentComponent) {
                    case "Introduction":
                        return null;
                    case "Description":
                        Store.currentComponent = "Devices";
                        return;
                    case "Devices":
                        Store.currentComponent = "Introduction";
                        return;
                }
            }
            }>
                <button className="button-back">
                    <img src="../../images/button-back-arrow.svg" className="button-back-image"/>
                </button>
                <p className="button-back-name">{name}</p>
            </div>
        );
    }
}

export default observer(ButtonBack);