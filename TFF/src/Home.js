import React, { Component } from 'react';
import update from 'react-addons-update';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Question from './components/Question';
//import Questions from './api/Questions';
//import QuestionCount from './components/QuestionCount';
import Tutorial from './components/Tutorial';
import Result from './components/Result';
import Popup from 'react-popup';



var Questions = [];

function getData() {
    fetch('/getTasks')
        .then(response => response.json())
        .then(
            function (json) {
                var Data = json.recordset;
                var x = 0;

                for (x in Data) {
                    var test = 0;
                    var y = 0;
                    var AnswerType;

                    if (Data[x].IsRight) {
                        AnswerType = "right";
                    } else {
                        AnswerType = "wrong";
                    }

                    for (y in Questions) {
                        if (Questions[y].id === Data[x].TaskID) {
                            test = 1;
                        }
                    }
                    if (test !== 1) {
                        Questions.push({
                            question: Data[x].TaskText, 
                            topic: Data[x].TopicID, 
                            id: Data[x].TaskID, 
                            answers: [{
                                type: AnswerType,
                                content: Data[x].AnswerText
                            }]
                        });
                        

                    } else {
                        Questions[y].answers.push({ type: AnswerType, content: Data[x].AnswerText });
                        
                    }
                }
                return Questions;
            }
        ).catch(err => { return err; });
}

getData();

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {
                right: 0,
                wrong: 0
            },
            result: ''
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }



    componentWillMount() {
        const shuffledAnswerOptions = Questions.map((question) => this.shuffleArray(question.answers));
        this.setState({
            question: Questions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }


    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }; 

    setUserAnswer(answer) {
        const updatedAnswersCount = update(this.state.answersCount, {
            [answer]: { $apply: (currentValue) => currentValue + 1 }
        });
        this.setState({
            answersCount: updatedAnswersCount,
            answer: answer
        });
    }


    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: Questions[counter].question,
            answerOptions: Questions[counter].answers,
            answer: ''
        });
    }

    setSameQuestion() {
        const counter = this.state.counter;
        const questionId = this.state.questionId;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: Questions[counter].question,
            answerOptions: Questions[counter].answers,
            answer: ''
        });
    }


    handleAnswerSelected(event) {
        var currentAnswer = event.currentTarget.value;
        this.setUserAnswer(currentAnswer); 
        Popup.alert(currentAnswer);
        if (this.state.questionId < Questions.length) {
            if (currentAnswer === 'right') {
                setTimeout(() => this.setNextQuestion(), 300);
            }
            else {
                setTimeout(() => this.setSameQuestion(), 300);
            }
        }
        else
        {
            if (currentAnswer === 'right') {
                //setTimeout(() => this.setResults(this.getResults()), 300);
                setTimeout(() => this.setState({result: 'Success'}), 300);
            }
            else {
                setTimeout(() => this.setSameQuestion(), 300);
            }
        }
    }

    renderQuiz() {
        return (
            <Tutorial
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={Questions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }

    renderResult() {
        return <Result quizResult={this.state.result} />;
    }

    render() {
        return (
            <div className="Home">
                <div className="App-header">
                    <h2>TF Tutorial</h2>
                </div>
                {this.state.result ? this.renderResult() : this.renderQuiz()}
            </div>
        );
    }
}

export default Home;
