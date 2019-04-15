import React, { Component } from 'react';
import update from 'react-addons-update';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Question from './components/Question';
//import Questions from './api/Questions';
import QuestionCount from './components/QuestionCount';
import Tutorial from './components/Tutorial';
import Result from './components/Result';



var Data = [];
var Questions = [];

function getData() {
    fetch('/server')
        .then(response => response.json())
        .then(
            function (json) {
                var tasks = json.recordset;
                Data = tasks;
                var x;

                for (x in Data) {
                    Questions[x] = {};
                    Questions[x].question = Data[x].TaskText;
                    Questions[x].topic = Data[x].TopicID;
                    Questions[x].id = Data[x].ID;

                    Questions[x].answers = [];
                    Questions[x].answers[0] = { type: "right", content: "ngh" };
                }
                console.log('in fetch!');
                console.log(Questions);
                return tasks;
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


    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };


    componentWillMount() {
        const shuffledAnswerOptions = Questions.map((question) => this.shuffleArray(question.answers));
        this.setState({
            question: Questions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

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


    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId < Questions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setResults(result) {
        if (result.length === 1) {
            this.setState({ result: result[0] });
        } else {
            this.setState({ result: 'Undetermined' });
        }
    }

    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);

        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
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
