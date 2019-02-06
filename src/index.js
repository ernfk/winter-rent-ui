/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './components/Overview/overview.jsx';
import AdminPanel from "./components/AdminPanel/admin-panel.jsx";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/root-reducer";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const routing = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Overview} />
                <Route exact path="/admin" component={AdminPanel} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('overview'));
