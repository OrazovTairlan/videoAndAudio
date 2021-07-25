import React, {Component} from 'react';
import {v4 as uuidv4} from "uuid";
import _ from "lodash";
import TimerQuestion from "./TimerQuestion";
import {observer} from "mobx-react";
import Store from "../../store/store";
import {toJS} from "mobx";

class Questions extends Component {
    data = [
        {
            questionText: "Вопрос 1",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        },
        {
            questionText: "Вопрос 2",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        },
        {
            questionText: "Вопрос 3",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        },
        {
            questionText: "Вопрос 4",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        },
        {
            questionText: "Вопрос 5",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        },
        {
            questionText: "Вопрос 6",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        },
        {
            questionText: "Вопрос 7",
            answerOptions: [
                {answerText: 'New York', isCorrect: false, id: uuidv4()},
                {answerText: 'London', isCorrect: false, id: uuidv4()},
                {answerText: 'Paris', isCorrect: true, id: uuidv4()},
                {answerText: 'Dublin', isCorrect: false, id: uuidv4()},
            ],
        }
    ]
    state = {
        currentQuestion: 0,
        finishQuestions: false,
        answerCount: "0 %",
        completedQuestion: [],
        checked: false,
        completedQuestionCopy: [],
        count: 0,
        progressBarCount: 0

    }

    handleNextButton = () => {
        this.handleNextQuestion();
        this.deleteAllDatasetAttribCheckedInput();
    }

    handleAnswer = (e) => {
        this.handleInput(e);
    }

    handleInput = (e) => {
        const currentQuestion = this.state.currentQuestion;
        if (this.isCheckedInput(e)) { // тут удаляем атрибут
            this.deleteDatasetAttribInput(e);
            this.handlePercentAnswersBack();
            this.handleProgressBarBack();
            this.handleCompletedQuestions();
            // this.setState({[currentQuestion]: {}});
            Store.questions = {...Store.questions, [currentQuestion]: {}};
            this.deleteCompletedQuestions();
            // const filteredArray = [...Store.completedQuestions.filter((item) => item != currentQuestion)];
            // Store.completedQuestions = [...filteredArray];
            return;
        }
        this.deleteAllDatasetAttribCheckedInput(); // здесь добавляем атрибут
        this.addDatasetAttribInput(e);
        if (this.isFilledAnswer()) {
            this.setState(state => ({...state}));
            this.handleCompletedQuestions();
            Store.questions = {...Store.questions, [currentQuestion]: {[e.target.dataset.id]: true}};
            // Store.completedQuestions = [...Store.completedQuestions, [currentQuestion]];
            return;
        }
        this.handleProgressBar();
        this.handlePercentAnswers();
        this.handleCompletedQuestions();
        Store.questions = {...Store.questions, [currentQuestion]: {[e.target.dataset.id]: true}};
        // Store.completedQuestions = [...Store.completedQuestions, [currentQuestion]];
        // this.setState({[currentQuestion]: {[e.target.dataset.id]: true}});
    }

    handleCompletedQuestions = () => {
        const {completedQuestion} = this.state;
        const uniqArray = _.uniq([...completedQuestion, this.state.currentQuestion]);
        this.setState({completedQuestion: [...uniqArray]});
    }


    deleteCompletedQuestions = () => {
        const {completedQuestion} = this.state;
        const uniqArray = _.uniq([...completedQuestion]);
        const filteredArray = uniqArray.filter((item) => item != this.state.currentQuestion);
        this.setState({completedQuestion: filteredArray});
    }

    handleProgressBar = () => {
        const progressBarActive = document.querySelector(".question-progress-bar-active");
        const value = (Number(this.state.progressBarCount) + Math.round(100 / this.data.length));
        if (this.state.completedQuestion.length == this.data.length - 1) {
            this.setState({progressBarCount: "100"});
            progressBarActive.style.width = 100 + "%";
            return;
        }
        this.setState({progressBarCount: value});
        progressBarActive.style.width = value + "%";
    }

    handleProgressBarBack = () => {
        const progressBarActive = document.querySelector(".question-progress-bar-active");
        const value = (Number(this.state.progressBarCount) - Math.round(100 / this.data.length));
        if (this.state.completedQuestion.length == 1) {
            this.setState({progressBarCount: "0"});
            progressBarActive.style.width = 0 + "%";
            return;
        }
        this.setState({progressBarCount: value});
        progressBarActive.style.width = value + "%";
    }
    isFilledAnswer = () => {
        const {currentQuestion} = this.state;
        // console.log(this.state);
        // if (Object.keys(currentQuestion).length > 0) {
        //     return true;
        // }
        // return false;
        try {
            if (Object.keys(Store.questions[currentQuestion]).length > 0) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    handleValueAnswer = (e) => {
        const currentQuestion = this.state.currentQuestion;
        if (e.target.dataset.checked) {
            this.setState({[currentQuestion]: {}});
            return;
        }
        this.setState({[currentQuestion]: {[e.target.dataset.id]: true}});
    }

    isCheckedInput = (e) => {
        if (e.target.dataset.checked) {
            return true;
        }
        return false;
    }

    deleteAllDatasetAttribCheckedInput = () => {
        const questionInput = document.querySelectorAll(".question-answer input");
        Array.from(questionInput).forEach((item) => delete item.dataset.checked);
    }

    addDatasetAttribInput = (e) => {
        e.target.dataset.checked = "checked";
    }
    deleteDatasetAttribInput = (e) => {
        delete e.target.dataset.checked;
        e.target.checked = false;
    }

    handlePercentAnswers = () => {
        console.log(toJS(Object.keys(Store.questions).length), this.data.length);
        const answerCount = Number(this.state.answerCount.split(" %")[0]);
        const value = (answerCount + Math.round(Number(100 / this.data.length))) + " %";
        if (this.state.completedQuestion.length == this.data.length - 1) {
            this.setState({answerCount: "100 %"});
            return;
        }
        this.setState({answerCount: value});
    }

    handlePercentAnswersBack = () => {
        const answerCount = Number(this.state.answerCount.split(" %")[0]);
        const value = (answerCount - Math.round(Number(100 / this.data.length))) + " %";
        if (this.state.completedQuestion.length == 1) {
            this.setState({answerCount: "0 %"});
            return;
        }
        this.setState({answerCount: value});
    }


    handleNextQuestion = () => {
        const {currentQuestion} = this.state;
        const nextQuestion = currentQuestion + 1;
        this.setState({currentQuestion: nextQuestion});
    }

    handlePrevButton = () => {
        if (!this.isFirstQuestion()) {
            this.handlePrevQuestion();
            this.deleteAllDatasetAttribCheckedInput();
        }
    }
    isFirstQuestion = () => {
        const {currentQuestion} = this.state;
        if (currentQuestion == 0) {
            return true;
        }
        return false;
    }
    isEndQuestion = () => {
        const {currentQuestion} = this.state;
        const lastQuestion = this.data.length - 1;
        if (currentQuestion == lastQuestion) {
            return true;
        }
        return false;
    }
    handlePrevQuestion = () => {
        const {currentQuestion} = this.state;
        const prevQuestion = currentQuestion - 1;
        this.setState({currentQuestion: prevQuestion});
    }

    render() {
        const {currentQuestion} = this.state;
        return (
            <div className="question">
                <header class="question-header">
                    <div class="question-title">
                        Физика
                    </div>
                    <div class="question-statistics">
                        <div class="question-statistics-answer">
                            <span class="question-statistics-answer-suptext">Есть ответы:</span>
                            <span class="question-statistics-answer-subtext">{this.state.answerCount}</span>
                        </div>
                        <div class="question-statistics-answer-line">

                        </div>
                        <div className="question-statistics-count">
                            <span className="question-statistics-count-suptext">Есть ответы:</span>
                            <TimerQuestion minutes="11" seconds="0"/>
                        </div>
                    </div>
                </header>
                <hr className="question-progress-bar-top-hr"/>
                <div class="question-progress-bar">
                    <div class="question-progress-bar-active">

                    </div>
                </div>
                <hr className="question-progress-bar-bottom-hr"/>
                <div class="question-main">
                    <div class="question-count">
                        Вопрос {currentQuestion + 1} из {this.data.length}
                    </div>
                    <div class="question-main-content">
                        <div class="question-left-content">
                            <div class="question-description">
                                <p class="question-description-text">
                                    {this.data[currentQuestion].questionText}
                                </p>
                            </div>
                            <div class="question-answer">
                                {this.data[currentQuestion].answerOptions.map((item) => {
                                    return (
                                        <div className="question-answer-variant">
                                            {Store.questions[currentQuestion] != undefined ? Store.questions[currentQuestion][item.id] == true ?
                                                <>
                                                    <input type="radio" data-id={`${item.id}`} name="answer"
                                                           data-value={`${item.answerText}`}
                                                           data-checked="checked"
                                                           checked
                                                           onClick={this.handleAnswer}
                                                           className="question-answer-input"/>
                                                    <span className="question-answer-text"
                                                          data-id={`${item.id}`}>{item.answerText}</span>
                                                </> :
                                                <>
                                                    <input type="radio" data-id={`${item.id}`} name="answer"
                                                           data-value={`${item.answerText}`}
                                                           onClick={this.handleAnswer}
                                                           className="question-answer-input"/>
                                                    <span className="question-answer-text"
                                                          data-id={`${item.id}`}>{item.answerText}</span>
                                                </>
                                                : <>
                                                    <input type="radio" data-id={`${item.id}`} name="answer"
                                                           data-value={`${item.answerText}`}
                                                           onClick={this.handleAnswer}
                                                           className="question-answer-input"/>
                                                    <span className="question-answer-text"
                                                          data-id={`${item.id}`}>{item.answerText}</span>
                                                </>
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="question-navigation">
                                {currentQuestion >= this.data.length - 1 || this.state.completedQuestion.length == this.data.length ? (
                                    <>
                                        <div className="question-prev">
                                            <button onClick={this.handlePrevButton}
                                                    className="question-prev-button btn">
                                                Предыдущий
                                            </button>
                                        </div>
                                        <div className="question-next">
                                            <button className="question-next-button btn">
                                                Завершить
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="question-prev">
                                            <button
                                                onClick={this.handlePrevButton}
                                                className="question-prev-button btn">
                                                Предыдущий
                                            </button>
                                        </div>
                                        <div className="question-next">
                                            <button className="question-next-button btn"
                                                    onClick={this.handleNextButton}>
                                                Следующий
                                            </button>
                                        </div>
                                    </>
                                )
                                }
                            </div>
                        </div>
                        <div class="question-right-content">
                            <div class="question-table-nav">
                                <ul class="question-items">
                                    {this.data.map((item, index) => {
                                        const {completedQuestion} = this.state;
                                        {
                                            return completedQuestion.filter((item) => item == index).length > 0 ?
                                                <li className="question-item completed-question-navigation"
                                                    data-id={`${index + 1}`}>
                                                    <button className="question-item-button"
                                                            onClick={() => this.setState({currentQuestion: index})}>
                                                        {index + 1}
                                                    </button>
                                                </li> :
                                                <li className="question-item not-completed-question-navigation"
                                                    data-id={`${index + 1}`}>
                                                    <button className="question-item-button"
                                                            onClick={() => this.setState({currentQuestion: index})}>
                                                        {index + 1}
                                                    </button>
                                                </li>
                                        }

                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(Questions);