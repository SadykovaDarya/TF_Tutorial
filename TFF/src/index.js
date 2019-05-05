import _ from 'lodash';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';


var d = document.createElement("div");
d.id = 'root';
document.body.appendChild(d);

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));

module.hot.accept();
