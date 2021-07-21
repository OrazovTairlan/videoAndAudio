import React, {Component} from 'react';

class Question extends Component {
    render() {
        return (
            <div className="question">
                <header class="question-top">
                    <div class="question-title">Физика</div>
                    <div class="question-statistics">
                        <div class="question-answers-statistics">
                            <span class="question-answers-suptext">Есть ответы:</span>
                            <span class="question-answers-subtext">20 %</span>
                        </div>
                        <div class="question-statistics-vertical-line">

                        </div>
                        <div class="question-answers-statistics-time">
                            <span class="question-answers-statistics-time-suptext">Осталось времени:</span>
                            <span class="question-answers-statistics-time-subtext">08:25</span>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Question;