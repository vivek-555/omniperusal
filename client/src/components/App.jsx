import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router'
import * as actionTypes from '../actionTypes/login';
import * as appUtils from '../utils/app_utils'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let authToken = localStorage.getItem("authToken");

        if(authToken) {
            browserHistory.push('/dashboard');

            let userDetails = appUtils.safeJSONParse(localStorage.getItem("userDetails")) || {};

            this.props.restoreLogin({
                email: localStorage.getItem("email"),
                userDetails: userDetails,
                token: authToken,
                loggedIn: true
            });
        }
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        restoreLogin: (payload) => dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);