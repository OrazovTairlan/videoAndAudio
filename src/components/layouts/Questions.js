import React, {Component} from 'react';
import Timer from "./Timer";
import {v4 as uuidv4} from "uuid";
import _ from "lodash";
import TimerQuestion from "./TimerQuestion";

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
        currentToggle: false,
        completedQuestionCopy: []
    }
    handleAnswer = (e) => {
        if (!this.state.finishQuestions) {
            this.handleValueAnswer(e);
            this.handlePercentAnswers();
            this.handleCompletedQuestions();
            this.handleProgressBar();
            this.handleCopyCompletedQuestions();
            this.handleActiveButtonQuestions();
            this.isEqualCompletedQuestionsToQuestion();
        }
        if (e.target.dataset.checked == undefined) {
            this.handleDeleteCompletedQuestions();
            this.handlePercentAnswerBack();
        }

    }
    handleNextButton = () => {
        if (!this.isQuestionEnd()) {
            const checkedElements = document.querySelectorAll("[data-checked = 'checked']");
            Array.from(checkedElements).forEach((item) => {
                delete item.dataset.checked
                item.checked = false;
            });
            this.handleNextQuestion();
        }
    }
    isFirstQuestion = () => {
        if (this.state.currentQuestion == 0) {
            return true;
        }
        return false;
    }

    isEmptyAnswer = () => {
        if (this.state[this.state.currentQuestion] != undefined && Object.keys(this.state[this.state.currentQuestion]).length == 0) {
            return true;
        }
        return false;
    }
    handleBackQuestion = () => {
        let {currentQuestion} = this.state;
        const prevQuestion = currentQuestion - 1;
        this.setState({currentQuestion: prevQuestion});
    }


    isEqualCompletedQuestionsToQuestion = () => {
        if (this.state.completedQuestion.length == this.data.length) {
            this.setState({finishQuestions: true});
            return;
        }
        this.setState({finishQuestions: false});
    }
    isFilledAnswer = () => {
        if (this.state[this.state.currentQuestion] != undefined) {
            return true;
        }
        return false;
    }
    handleCopyCompletedQuestions = () => {
        const {completedQuestionCopy} = this.state;
        const uniqArray = _.uniq([...completedQuestionCopy, this.state.currentQuestion]);
        this.setState({completedQuestionCopy: [...uniqArray]});
    }
    handlePercentAnswers = () => {
        if (this.state.completedQuestionCopy.filter((item) => item == this.state.currentQuestion).length == 0) {
            console.log("checked");
            // if (this.state.completedQuestion.filter((item) => item == this.state.currentQuestion).length <= 0) {
            const value = Math.round(100 / this.data.length) + Number(this.state.answerCount.split(" %")[0]) + " %";
            if (this.state.completedQuestion.length == this.data.length - 1) {
                this.setState({answerCount: "100 %"});
                return;
            }
            this.setState({answerCount: value});
        }
        // }
    }
    handlePercentAnswerBack = () => {
        // if (this.state.completedQuestion.filter((item) => item == this.state.currentQuestion).length == 0) {
        const value = (Number(this.state.answerCount.split(" %")[0]) - Math.round(100 / this.data.length)) + " %";
        // if (this.state.completedQuestion.length == this.data.length) {
        //     console.log("end answer count");
        //     this.setState({answerCount: "0 %"});
        //     return;
        // }
        this.setState({answerCount: value});
        // }
    }
    isQuestionEnd = () => {
        let {currentQuestion} = this.state;
        if (currentQuestion + 1 == this.data.length) {
            return true;
        }
        console.log(currentQuestion + 1);
        return false;
    }
    handleCompletedQuestions = () => {
        const {completedQuestion} = this.state;
        const uniqArray = _.uniq([...completedQuestion, this.state.currentQuestion]);
        this.setState({completedQuestion: [...uniqArray]});
    }

    handleNextQuestion = () => {
        let {currentQuestion} = this.state;
        const nextQuestion = currentQuestion + 1;
        this.setState({currentQuestion: nextQuestion});
    }
    handleDeleteCompletedQuestions = () => {
        const {completedQuestion} = this.state;
        const uniqArray = _.uniq([...completedQuestion]);
        const filteredArray = uniqArray.filter((item) => item != this.state.currentQuestion);
        this.setState({completedQuestion: [...filteredArray]});
    }
    handleProgressBar = () => {
        if (this.state.completedQuestion.filter((item) => item == this.state.currentQuestion).length == 0) {
            const progressBarActive = document.querySelector(".question-progress-bar-active");
            const value = (Number(progressBarActive.style.width.split("%")[0]) + (Math.round(100 / this.data.length))) + "%";
            if (this.state.completedQuestion.length == this.data.length - 1) {
                console.log("something");
                progressBarActive.style.width = "100%";
            }
            if (progressBarActive.style.width != "100%") {
                progressBarActive.style.width = value;
            }
        }
    };
    handleValueAnswer = (e) => {
        const currentQuestion = this.state.currentQuestion;
        if (e.target.dataset.checked) {
            e.target.checked = false;
            delete e.target.dataset.checked;
            this.setState({[currentQuestion]: {}});
            return;
        }
        e.target.dataset.checked = "checked";
        this.setState({[currentQuestion]: {[e.target.dataset.id]: true}});
    }
    handleActiveButtonQuestions = () => {
        const navButtonQuestions = document.querySelector(`li[data-id="${this.state.currentQuestion + 1}"]`);
        console.log(this.state.completedQuestion);
        if (this.state.completedQuestion.filter((item) => item == this.state.currentQuestion).length > 0) {
            console.log("off");
            navButtonQuestions.classList.remove("completed-question-navigation");
        } else {
            console.log("on");
            navButtonQuestions.classList.add("completed-question-navigation");
        }
    };

    render() {
        const {currentQuestion, finishQuestion} = this.state;
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
                                            {this.state[currentQuestion] != undefined ? this.state[currentQuestion][item.id] == true ?
                                                <>
                                                    <input type="checkbox" data-id={`${item.id}`} name="answer"
                                                           checked
                                                           data-value={`${item.answerText}`}
                                                           onClick={this.handleAnswer}
                                                           className="question-answer-input"/>
                                                    <span className="question-answer-text"
                                                          data-id={`${item.id}`}>{item.answerText}</span>
                                                </> :
                                                <>
                                                    <input type="checkbox" data-id={`${item.id}`} name="answer"
                                                           data-value={`${item.answerText}`}
                                                           onClick={this.handleAnswer}
                                                           className="question-answer-input"/>
                                                    <span className="question-answer-text"
                                                          data-id={`${item.id}`}>{item.answerText}</span>
                                                </>
                                                : <>
                                                    <input type="checkbox" data-id={`${item.id}`} name="answer"
                                                           data-value={`${item.answerText}`}
                                                           onClick={this.handleAnswer}
                                                           className="question-answer-input"/>
                                                    <span className="question-answer-text"
                                                          data-id={`${item.id}`}>{item.answerText}</span>
                                                </>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="question-navigation">
                                {currentQuestion >= this.data.length - 1 || this.state.completedQuestion.length == this.data.length ? (
                                    <>
                                        <div className="question-prev">
                                            <button
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
                                        return (
                                            <li className="question-item not-completed-question-navigation"
                                                data-id={`${index + 1}`}>
                                                <button className="question-item-button"
                                                        onClick={() => this.setState({currentQuestion: index})}>
                                                    {index + 1}
                                                </button>
                                            </li>
                                        );
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

export default Questions;