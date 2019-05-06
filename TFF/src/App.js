import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Popup from 'react-popup';

import Home from './Home';
import About from './components/About';
import Topics from './components/Topics';
import Materials from './components/Materials';
import './App.css';
import './popup.css';



class App extends Component {
    render() {
        return (
            <Router>
                <Popup />
                <div className="App-header">
                    <h2>TF Tutorial</h2>
                </div>
                <div>
                    <ul className = "nav">
                        <Link to={'/materials'} className="nav-link"> Materials </Link> 
                        <Link to={'/quizzes'} className="nav-link"> Quiz </Link> 
                        <Link to={'/about'} className="nav-link"> About </Link> 
                    </ul>  
                    <hr />
                    <Switch>
                        <Route exact path='/materials' component={Materials} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/quizzes' component={Topics} />
                        <Route exact path='/home' component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;