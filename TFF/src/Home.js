﻿import React, { Component } from 'react';
import update from 'react-addons-update';
import Tutorial from './components/Tutorial';
import Result from './components/Result';
import Popup from 'react-popup';
import Button from 'react-bootstrap/Button';


var AllQuestions = [];

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

                    for (y in AllQuestions) {
                        if (AllQuestions[y].id === Data[x].TaskID) {
                            test = 1;
                        }
                    }
                    if (test !== 1) {
                        AllQuestions.push({
                            question: Data[x].TaskText,
                            topic: Data[x].TopicID,
                            id: Data[x].TaskID,
                            answers: [{
                                type: AnswerType,
                                content: Data[x].AnswerText
                            }]
                        });


                    } else {
                        AllQuestions[y].answers.push({ type: AnswerType, content: Data[x].AnswerText });

                    }
                }
                return AllQuestions;
            }
        ).catch(err => { return err; });
}

getData();
var Questions = [];

class Home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            topic: this.props.location.state.topic,
            topicName: this.props.location.state.topicName, 
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
        this.getQuestionsforTopic();

        const shuffledAnswerOptions = Questions.map((question) => this.shuffleArray(question.answers));
        this.setState({
            question: Questions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    getQuestionsforTopic() {
        Questions = [];
        var current_topic, i;
        current_topic = this.state.topic;
        for (i in AllQuestions) {
            if (AllQuestions[i].topic === current_topic) {
                Questions.push(AllQuestions[i]);
            }
        }
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
        setTimeout(() => Popup.close(), 400);
        if (this.state.questionId < Questions.length) {
            if (currentAnswer === 'right') {
                setTimeout(() => this.setNextQuestion(), 400);
            }
            else {
                setTimeout(() => this.setSameQuestion(), 400);
            }
        }
        else
        {
            if (currentAnswer === 'right') {
                setTimeout(() => this.setState({ result: 'You successfully passed the "' +  this.state.topicName + '" topic!'}), 300);
                //maybe: make transition to the materials from topics+1
                //gonna need another if later to check if there are topics at all

            //    this.setState({
            //        topic: this.state.topic + 1
            //    },
            //        function () {
            //            this.getQuestionsforTopic();
            //        });               
            }
            else {
                setTimeout(() => this.setSameQuestion(), 300);
            }
        }
    }

    renderRedirect() {
        this.props.history.push(
            {
                pathname: '/materials'
            }
        );
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
        return (
            <div>
                <Result quizResult={this.state.result} />
                <Button value="Go!" onClick={this.renderRedirect.bind(this)}> Go back to materials </Button>
            </div>
        );

    }

    render() {
        return (
            <div className="Home">
                {this.state.result ? this.renderResult() : this.renderQuiz()}
            </div>
        );
    }
}

export default Home;
