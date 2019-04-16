import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
    



class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 'Hi there!'
        };
    }

    componentDidMount() {

        var _this = this;
        fetch('/tasks')
            .then(response => response.json())
            .then(
                function (json) {
                    var tasks = json.recordset;
                    var test = tasks[0].ID;
                    _this.setState({ data: test });

                    return tasks;
                }
            ).catch(err => { return err; });


    }

    render() {
        return (
            <div>
                {this.state.data}
            </div>
        );
    }

}

export default About;

