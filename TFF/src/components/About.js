import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
    



class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "Hi! You might be wondering how we all ended up in here, right? Basically, I was studying neural networks and I had to use TensorFlow as a tool for training them... and I just couldn't get what it was! Eventually, I sorted everything out but I also realized that it's not that easy and others might need some help too. Thus, this project was born! If you some ideas or feedback, write me here:"
        };
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

