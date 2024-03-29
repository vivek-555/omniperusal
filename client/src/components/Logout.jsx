import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/login'
import {browserHistory} from 'react-router'


class Logout extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.handleSuccessfulLogoutRedirect =
            this.handleSuccessfulLogoutRedirect.bind(this);
    }

    logout() {
        this.props.logout();
    }

    componentWillUpdate() {
        this.handleSuccessfulLogoutRedirect();
    }

    handleSuccessfulLogoutRedirect() {
        if(!localStorage.getItem("authToken")) {
            browserHistory.push('/');
        }
    }


    render() {
        return <a href="javascript:void(0)" onClick={this.logout}>Logout</a>;
    }
}

const mapStateToProps = function(state) {
    return {
        ...state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Logout);