'use strict';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/signup';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import {Router, Route, browserHistory} from 'react-router';
import  './resources/styles/style.less';

import App from './components/App'
import EnsureLoggedInWrapper from './components/EnsureLoggedInWrapper'
import Layout from './components/Layout'


const createStoreWithMiddleware = applyMiddleware(
    thunk,
    promise,
    createLogger()
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={LoginPage}/>
                <Route path="/signup" component={SignupPage}/>
                <Route component={EnsureLoggedInWrapper}>
                    <Route component={Layout}>
                        <Route path="/dashboard" component={DashboardPage}/>
                        <Route path="/tasks" component={TasksPage}/>
                        <Route path="/add_task" component={AddTaskPage}/>
                    </Route>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
