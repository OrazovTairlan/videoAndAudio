    import React, {Component} from 'react';

class Question extends Component {
    data = [
        {
            questionText: "Вопрос 1",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        },
        {
            questionText: "Вопрос 2",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        },
        {
            questionText: "Вопрос 3",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        },
        {
            questionText: "Вопрос 4",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        },
        {
            questionText: "Вопрос 5",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        },
        {
            questionText: "Вопрос 5",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        },
        {
            questionText: "Вопрос 5",
            answerOptions: [
                {answerText: 'New York', isCorrect: false},
                {answerText: 'London', isCorrect: false},
                {answerText: 'Paris', isCorrect: true},
                {answerText: 'Dublin', isCorrect: false},
            ],
        }
    ]
    state = {
        currentQuestion: 0,
        finishQuestion: false
    }
    handleAnswer = () => {
        const length = this.data.length - 1;
        let {currentQuestion} = this.state;
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < this.data.length) {
            console.log(nextQuestion, this.data.length);
            // this.setState(prevState => {
            //     return {
            //         ...prevState,
            //         currentQuestion: prevState.currentQuestion + 1
            //     }
            // });
            this.handleProgressBar();
            this.setState({
                currentQuestion: nextQuestion
            });
        } else if (currentQuestion == this.data.length - 1) {
            this.handleProgressBar();
        } else {
            this.setState({finishQuestion: true});
            console.log("конец");
        }
    }
    handleProgressBar = (go = true) => {
        const progressBarActive = document.querySelector(".question-progress-bar-active");
        if (progressBarActive.style.width != "100%") {
            const value = 100 / this.data.length;
            // progressBar.style.width = progressBar.style.width + String(value) + "px";
            // progressBarAfter.getPropertyValue("width")
            console.log(progressBarActive.clientWidth);
            if (go) {
                if (progressBarActive.style.width < 1) {
                    progressBarActive.style.width += value + "%";
                } else {
                    progressBarActive.style.width = Number(progressBarActive.style.width.split("%")[0]) + value + "%";
                }
            }
        }
    };
    handleValueAnswer = (e) => {
        if (e.target.dataset.checked) {
            e.target.checked = false;
            delete e.target.dataset.checked;
            this.setState({[e.target.dataset.id]: null});
            return;
        }
        e.target.dataset.checked = "checked";
        this.setState({[e.target.dataset.id]: e.target.dataset.value});
    }

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
                            <span class="question-statistics-answer-subtext">20 %</span>
                        </div>
                        <div class="question-statistics-answer-line">

                        </div>
                        <div className="question-statistics-count">
                            <span className="question-statistics-count-suptext">Есть ответы:</span>
                            <span className="question-statistics-count-subtext">20 %</span>
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
                        Вопрос 8 из 30
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
                                                <input type="radio" data-id={currentQuestion} name="answer"
                                                       data-value={`${item.answerText}`}
                                                       onClick={this.handleValueAnswer}
                                                       className="question-answer-input"/>
                                                <span className="question-answer-text">{item.answerText}</span>
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
                                            <button className="question-next-button btn">
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
                                            <button className="question-next-button btn" onClick={() => {
                                                this.handleProgressBar();
                                                this.setState((state) => ({currentQuestion: state.currentQuestion + 1}))
                                            }}>
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
                                    <li class="question-item">
                                        <button class="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                    <li className="question-item">
                                        <button className="question-item-button">
                                            1
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Question;