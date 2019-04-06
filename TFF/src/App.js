import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './components/About';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>Welcome to TensorFlow Tutorial</h2>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/home'} className="nav-link"> Home!! </Link></li>
                            <li><Link to={'/about'} className="nav-link"> About </Link></li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/about' component={About} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;