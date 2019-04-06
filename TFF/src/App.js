import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>Welcome to TensorFlow!!</h2>
                </div>
            </Router>
        );
    }
}

export default App;