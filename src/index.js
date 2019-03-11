/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Overview from './components/overview/overview';
import AdminPanel from "./components/admin-panel/admin-panel";
import LoginPanel from './components/login-panel/login-panel';
import RegistrationPanel from './components/registration-panel/registration-panel';
import {applyMiddleware, compose, createStore} from "redux";
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
            <div>
            <Switch>
                <Route exact path="/" component={Overview} />
                <Route exact path="/admin" component={AdminPanel} />
                <Route exact path="/login" component={LoginPanel} />
                <Route exact path="/registration" component={RegistrationPanel} />
            </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('overview'));
