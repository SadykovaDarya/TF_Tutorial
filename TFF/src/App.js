import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './components/About';
import Topics from './components/Topics';
import Materials from './components/Materials';
import Popup from 'react-popup';
import './App.css';
import './popup.css';




class App extends Component {
    render() {
        return (
            <Router>
                <Popup />
                <div>
                    <h2>Welcome to TensorFlow Tutorial</h2>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/materials'} className="nav-link"> Materials </Link></li>
                            <li><Link to={'/about'} className="nav-link"> About </Link></li>
                            <li><Link to={'/quizzes'} className="nav-link"> Quiz </Link></li>
                        </ul>
                    </nav>
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