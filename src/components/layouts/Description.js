import React, {Component} from 'react';
import Timer from "./Timer";
import Store from "../../store/store";
import {observer} from "mobx-react";
import TimerDescription from "./TimerDescription";

class Description extends Component {
    state = {
        disabledButton: true
    }
    handleDisabledButton = () => {
        const timerBtn = document.querySelector(".right-content-button");
        timerBtn.classList.add("btn-allowed");
        timerBtn.classList.remove("btn-disabled")
        this.setState({disabledButton: false});
    }
    async componentDidMount() {
        await Store.auth();
        await Store.getDescription();
    }

    render() {
        return (
            <div className="description">
                <div class="description-suptitle">Начало экзамена</div>
                <div class="description-subtitle">Экзамен по дисциплине: “Физика”</div>
                <div class="description-content">
                    <div class="left-content">
                        <div class="left-content-teacher">Преподователь:</div>
                        <br/>
                        <div class="left-content-teacher-name">Иванов Иван Иванович</div>
                        <div className="left-content-count-attempts">Преподователь:</div>
                        <br/>
                        <div className="left-content-count-description">Иванов Иван Иванович</div>
                        <div className="left-content-duration">Преподователь:</div>
                        <br/>
                        <div className="left-content-description">Иванов Иван Иванович</div>
                        <div className="left-content-count-questions">Преподователь:</div>
                        <br/>
                        <div className="left-content-count-question-description">Иванов Иван Иванович</div>
                        <div className="left-content-date-start">Преподователь:</div>
                        <br/>
                        <div className="left-content-date-start-description">Иванов Иван Иванович</div>
                        <div className="left-content-date-end">Преподователь:</div>
                        <br/>
                        <div className="left-content-date-end-description">Иванов Иван Иванович</div>
                    </div>
                    <div class="right-content">
                        <div class="right-content-title">
                            До начала тестирования:
                        </div>
                        <div class="right-content-timer">
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <TimerDescription hours = "1" minutes="10" seconds="0" update={this.handleDisabledButton}/>
                        </div>
                        <div className="right-content-button-next">
                            <button disabled={false}
                                    onClick={() => {
                                        Store.currentComponent = "Questions";
                                        Store.showButton = false;
                                    }}
                                    className="right-content-button btn btn-disabled">
                                Начать тестирование
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(Description);