import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';

class Topics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTopics: [], 
            chosenTopic: 0
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
        console.log(text, id);
    }


    render() {
        return (
            <div className="app">
                <div className="container">
                    <Select options={this.state.allTopics} onChange={opt => this.handleChange(opt.label, opt.value)} />
            </div>
        </div>
)}
}

export default Topics;