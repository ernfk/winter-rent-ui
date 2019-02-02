/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './components/containers/Overview.jsx';


const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={Overview} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('overview'));
