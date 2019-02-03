/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './components/components/Overview/Overview.jsx';
import AdminPanel from "./components/components/AdminPanel/AdminPanel.jsx";


const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/admin" component={AdminPanel} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('overview'));
