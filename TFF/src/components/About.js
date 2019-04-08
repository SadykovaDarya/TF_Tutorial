import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
var nf = require('node-fetch');

class About extends Component {

    componentDidMount() {
        console.log(this.getTasks());
    }
    
    getTasks() {
        fetch('/server').then(
            function (u) { return u.json(); }
        ).then(
            function (json) {
                console.log(json);
                return json;
            }
        ).catch(err => { return err; });
    }
    


    render() {
        return (
            <Router>
                <div>
                    <h1>I am a student at HSE and I love coding in my free time!</h1>
                </div>
            </Router>
        );
    }
}

export default About;