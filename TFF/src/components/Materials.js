import React, { Component } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import '../style.css';



class Materials extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTopics: [],
            chosenMaterials:[],
            chosenTopic: -1, 
            redirect: false
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
                    var mappedData = [];

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

        this.getMaterials(1);
    }

    getMaterials(topic) {
        var _this = this;

        fetch('/getMaterials?topic=' + topic)
            .then(response => response.json())
            .then(
                function (json) {
                    var data = json.recordset;

                    var x;
                    var mappedData = [];

                    for (x in data) {
                        mappedData.push({
                            materialID: data[x].ID,
                            topicID: data[x].TopicID,
                            materialText: data[x].MaterialText,
                            orderNumber: data[x].OrderNumber
                        });
                    }

                    _this.setState({
                        chosenMaterials: mappedData
                    });
                    console.log("in fetch!", mappedData);
                    return data;
                }
            ).catch(err => { return err; });
    }



    handleChangeTopic(text, id) {
        this.getMaterials(id);
        this.setState({
            chosenTopic: id
        });
    }
    

    renderRedirect() {
        console.log("in render redirect!");
        this.props.history.push(
            {
                pathname: '/home',
                state: { topic: this.state.chosenTopic }
            }
        );
    }


    render() {
        if (this.state.chosenTopic >= 0) {
            return (
                <div className="app">
                    <div className="container">
                        <Select options={this.state.allTopics} onChange={opt => this.handleChangeTopic(opt.label, opt.value)} />
                    </div>

                    <div>
                        {this.state.chosenMaterials[0].materialText}
                    </div>

                    <div>
                        <Button value="Go!" onClick={this.renderRedirect.bind(this)} />
                    </div>

                </div>
            );
        }

        return (
            <div className="app">
                <div className="container">
                    <Select options={this.state.allTopics} onChange={opt => this.handleChangeTopic(opt.label, opt.value)} />
                </div>
            </div>
        );
    }

}

export default Materials;
