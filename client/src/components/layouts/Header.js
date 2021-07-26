import React, {Component} from 'react';
import "../../App.css";
import Store from "../../store/store";
import {observer} from "mobx-react";

class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="header-inner">
                    <div className="header-logo">
                        <img src="../../images/logo.svg" alt="Zhubanov University" className="header-logo__image"/>
                        <div className="header-logo-suptitle">
                            <img src="../../images/header-logo-title.svg" alt="" className="header-logo__title"/>
                        </div>
                    </div>
                    <div className="header-main">
                        <div className="header-main-suptitle">
                            <p className="header-main-suptext">
                                Подготовка к экзамену
                            </p>
                        </div>
                        <div className="header-main-subtitle">
                            <ul className="header-main-subtitle__stages">
                                <li className={`header-main-subtitle-list ${Store.currentComponent == "Introduction" ? "active-list" : ""}`}>
                                    Ознакомление
                                </li>
                                <img src="../../images/header-main-arrow.svg" className="list-arrow"/>
                                <li className={`header-main-subtitle-list ${Store.currentComponent == "Devices" ? "active-list" : ""}`}>
                                    Проверка компьютера
                                </li>
                                <img src="../../images/header-main-arrow.svg" className="list-arrow"/>
                                <li className={`header-main-subtitle-list ${Store.currentComponent == "Description" ? "active-list" : ""}`}>
                                    Начало экзамена
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(Header);