/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/root-reducer";
import Overview from './components/overview/Overview';
import AdminPanel from "./components/admin-panel/AdminPanel";
import LoginPanel from './components/login-panel/LoginPanel';
import RegistrationPanel from './components/registration-panel/RegistrationPanel';
import Profile from "./components/profile/Profile";
import Ski from "./components/tabs/ski/Ski";

 
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
                    <Route exact path="/" component={Overview}/>
                    <Route exact path="/admin" component={AdminPanel}/>
                    <Route exact path="/login" component={LoginPanel}/>
                    <Route exact path="/registration" component={RegistrationPanel}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/ski" component={Ski}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('overview'));
