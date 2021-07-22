import React, {Component} from 'react';
import "../../App.css"
class ButtonBack extends Component {
    render() {
        const {name} = this.props;
        return (
            <div className="back">
                <button className="button-back">
                    <img src="../../images/button-back-arrow.svg" className="button-back-image"/>
                </button>
                <p className="button-back-name">{name}</p>
            </div>
        );
    }
}

export default ButtonBack;