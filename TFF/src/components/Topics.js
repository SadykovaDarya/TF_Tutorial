import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

class Topics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTopics: [], 
            chosenTopic: -1, 
            topicName: ""
        };
    }


    componentDidMount() {
        var _this = this;

        fetch('/getTopics')
            .then(response => response.json())
            .then(
                function (json) {
                    var data = json.recordset;

                    var x;
                    var mappedData=[];

                    for (x in data) {
                        mappedData.push({
                            label: data[x].TopicName,
                            value: data[x].ID
                        });
                    }

                    _this.setState({
                        allTopics: mappedData
                    });

                    return data;
                }
        ).catch(err => { return err; });
    }



    handleChange(text, id) {
        this.setState({
            chosenTopic: id,
            topicName: text
        });
    }


    render() {
        if (this.state.chosenTopic >=0) {
            return (
                <Redirect to={
                {
                pathname: '/home',
                        state: {
                            topic: this.state.chosenTopic,
                            topicName: this.state.topicName
                        }
                }
                } />
            );
        }
        return (
            <div className="app">
                <div className="container">
                    <Select options={this.state.allTopics} placeholder={"Select topic..."} onChange={opt => this.handleChange(opt.label, opt.value)} />
            </div>
        </div>
)}
}

export default Topics;