import React, {Component} from 'react';
import Timer from "./Timer";
import {v4 as uuidv4} from "uuid";

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
        finishQuestion: false,
        answerCount: "0 %",
        seconds: 5,
        minutes: 1,
        0: {}
    }
    handleAnswer = () => {
        const length = this.data.length - 1;
        let {currentQuestion} = this.state;
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < this.data.length) {
            const value = Math.round((100 / this.data.length) + Number(this.state.answerCount.split(" %")[0])) + " %";
            console.log(value, "value");
            console.log(nextQuestion, this.data.length);
            // this.setState(prevState => {
            //     return {
            //         ...prevState,
            //         currentQuestion: prevState.currentQuestion + 1
            //     }
            // });
            this.handleProgressBar();
            this.handleActiveButtonQuestions();
            this.setState({
                currentQuestion: nextQuestion,
                answerCount: value
            });
        } else if (currentQuestion == this.data.length - 1 && this.state.answerCount != "100 %") {
            const value = Math.round((100 / this.data.length) + Number(this.state.answerCount.split(" %")[0])) + " %";
            this.setState({answerCount: "100 %"});
            this.handleProgressBar();
        } else {
            this.setState({finishQuestion: true});
            console.log("конец");
        }
    }
    handleProgressBar = (go = true) => {
        const progressBarActive = document.querySelector(".question-progress-bar-active");
        if (progressBarActive.style.width != "100%" || Number(progressBarActive.style.width.split("%")[0]) > 100) {
            const value = Math.round(100 / this.data.length);
            // progressBar.style.width = progressBar.style.width + String(value) + "px";
            // progressBarAfter.getPropertyValue("width")
            console.log(progressBarActive.clientWidth);
            if (go) {
                if (progressBarActive.style.width < 1) {
                    progressBarActive.style.width += value + "%";
                } else if (this.state.currentQuestion == this.data.length - 1) {
                    progressBarActive.style.width = "100%";
                } else {
                    progressBarActive.style.width = Number(progressBarActive.style.width.split("%")[0]) + value + "%";
                }
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
        if (Object.keys(this.state[this.state.currentQuestion]).length > 0) {
            console.log(Object.keys(this.state[this.state.currentQuestion]).length);
            const navButtonQuestions = document.querySelector(`li[data-id="${this.state.currentQuestion + 1}"]`);
            console.log(navButtonQuestions);
            navButtonQuestions.classList.remove("not-completed-question-navigation");
            navButtonQuestions.classList.add("completed-question-navigation");
        } else {
            const navButtonQuestions = document.querySelector(`li[data-id="${this.state.currentQuestion + 1}"]`);
            console.log(navButtonQuestions);
            navButtonQuestions.classList.remove("completed-question-navigation");
            navButtonQuestions.classList.add("not-completed-question-navigation");
        }
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevState[this.state.currentQuestion]) {
    //         const navButtonQuestions = document.querySelector(`li[data-id="${this.state.currentQuestion + 1}"]`);
    //         console.log(navButtonQuestions);
    //         navButtonQuestions.classList.add("completed-question-navigation");
    //     }
    // }

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
                            <span className="question-statistics-count-subtext"></span>
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
                                            <label>
                                                {this.state[currentQuestion] != undefined ? this.state[currentQuestion][item.id] == true ?
                                                    <>
                                                        <input type="radio" data-id={`${item.id}`} name="answer"
                                                               checked
                                                               data-value={`${item.answerText}`}
                                                               onClick={this.handleValueAnswer}
                                                               className="question-answer-input"/>
                                                        <span className="question-answer-text"
                                                              data-id={`${item.id}`}>{item.answerText}</span>
                                                    </> :
                                                    <>
                                                        <input type="radio" data-id={`${item.id}`} name="answer"
                                                               data-value={`${item.answerText}`}
                                                               onClick={this.handleValueAnswer}
                                                               className="question-answer-input"/>
                                                        <span className="question-answer-text"
                                                              data-id={`${item.id}`}>{item.answerText}</span>
                                                    </>
                                                    : <>
                                                        <input type="radio" data-id={`${item.id}`} name="answer"
                                                               data-value={`${item.answerText}`}
                                                               onClick={this.handleValueAnswer}
                                                               className="question-answer-input"/>
                                                        <span className="question-answer-text"
                                                              data-id={`${item.id}`}>{item.answerText}</span>
                                                    </>
                                                }
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="question-navigation">
                                {currentQuestion >= this.data.length - 1 ? (
                                    <>
                                        <div className="question-prev">
                                            <button
                                                onClick={() => this.setState(state => ({currentQuestion: state.currentQuestion - 1}))}
                                                className="question-prev-button btn">
                                                Предыдущий
                                            </button>
                                        </div>
                                        <div className="question-next">
                                            <button className="question-next-button btn" onClick={this.handleAnswer}>
                                                Завершить
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="question-prev">
                                            <button disabled={currentQuestion == 0}
                                                    onClick={() => {
                                                        this.setState(state => ({currentQuestion: state.currentQuestion - 1}))
                                                    }}
                                                    className="question-prev-button btn">
                                                Предыдущий
                                            </button>
                                        </div>
                                        <div className="question-next">
                                            <button className="question-next-button btn" onClick={this.handleAnswer}>
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