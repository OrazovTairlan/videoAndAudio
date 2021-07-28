import React, {Component} from 'react';
import Timer from "./Timer";
import Store from "../../store/store";
import {observer} from "mobx-react";
import TimerDescription from "./TimerDescription";
import {CircularProgress, Dialog} from "@material-ui/core";

class Description extends Component {
    state = {
        disabledButton: true,
        loading: true
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
        this.setState({loading: false});
    }

    render() {
        console.log(Store.descriptionsData.countDown);
        const dateStartFirst = new Date(Store.descriptionsData.dateOfPublication).toLocaleString().split(", ")[0];
        const dateStartLast = new Date(Store.descriptionsData.dateOfPublication).toLocaleString().split(", ")[1];
        const dateEndFirst = new Date(Store.descriptionsData.dateOfExpiration).toLocaleString().split(", ")[0];
        const dateEndLast = new Date(Store.descriptionsData.dateOfExpiration).toLocaleString().split(", ")[1];
        {
            return this.state.loading == false ? <div className="description">
                <div class="description-suptitle">Начало экзамена</div>
                <div class="description-subtitle">{Store.descriptionsData.title}</div>
                <div class="description-content">
                    <div class="left-content">
                        <div class="left-content-item">
                            <div class="left-content-teacher description-common-title">Преподователь:</div>
                            <br/>
                            <div
                                class="left-content-teacher-name description-common-content">{Store.descriptionsData.employee}</div>
                        </div>
                        <div class="left-content-item">
                            <div className="left-content-count-attempts-title description-common-title">Количество
                                попыток
                                сдачи теста:
                            </div>
                            <div
                                className="left-content-count-attempts description-common-content">{Store.descriptionsData.attempts}:
                            </div>
                        </div>
                        <br/>
                        <div class="left-content-item">
                            <div className="left-content-count-description description-common-title">Длительность
                                теста:
                            </div>
                            <div
                                className="left-content-duration description-common-content">{Store.descriptionsData.duration} мин
                            </div>
                        </div>
                        <br/>
                        <div className="left-content-item">
                            <div className="left-content-description description-common-title">Иванов Иван Иванович
                            </div>
                            <div className="left-content-count-questions">Преподователь:</div>
                        </div>
                        <br/>
                        <div className="left-content-count-question-description">Иванов Иван Иванович</div>
                        <div className="left-content-item">
                            <div className="left-content-date-start description-common-title">Дата и время начала
                                тестирования:
                            </div>
                            <br/>
                            <div
                                className="left-content-date-start-description description-common-content">{dateStartFirst} {dateStartLast}</div>
                        </div>
                        <div className="left-content-item">
                            <div className="left-content-date-end description-common-title">Дата и время окончания
                                тестирования:
                            </div>
                            <br/>
                            <div
                                className="left-content-date-end-description description-common-content">{dateEndFirst} {dateEndLast}</div>
                        </div>
                    </div>
                    <div class="right-content">
                        <div class="right-content-title">
                            До начала тестирования:
                        </div>
                        <div class="right-content-timer">
                            <TimerDescription time="300"
                                              update={this.handleDisabledButton}/>
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
            </div> : <div className="center"><CircularProgress/></div>
        }
    }
}

export default observer(Description);