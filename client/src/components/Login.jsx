import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/login'
import {Link} from 'react-router';

import {browserHistory} from 'react-router'
import FacebookLoginWrapper from './FacebookLoginWrapper'
import GoogleLoginWrapper from './GoogleLoginWrapper'


class Login extends Component {
    constructor(props) {
        super(props);

        this.authenticate = this.authenticate.bind(this);
        this.handleSuccessfulLoginRedirect =
            this.handleSuccessfulLoginRedirect.bind(this);
    }

    componentWillMount() {
        this.handleSuccessfulLoginRedirect();
    }

    componentWillUpdate() {
        this.handleSuccessfulLoginRedirect();
    }

    handleSuccessfulLoginRedirect() {
        if(localStorage.getItem("authToken")) {
            browserHistory.push('/dashboard');
        }
    }

    authenticate(event) {
        event.stopPropagation();
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        this.props.authenticate(username, password);
    }

    render() {
        return (
            <div className="login-container">
                <h3> welcome to login page </h3>

                {(this.props.loggedIn ? <h3>Logged in</h3> : <h3></h3>)}

                <form>
                    <div className="imgcontainer">
                        {/*<img src={avatar} alt="Avatar"*/}
                        {/*className="avatar"/>*/}
                    </div>

                    <div className="container">
                        <label><b>Username</b></label>
                        <input type="text" id="username"
                               placeholder="Enter Username" name="uname"
                               required/>

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password"
                               name="psw" required
                               id="password"/>

                        <button onClick={this.authenticate}>Login</button>
                        {/*<FacebookLoginWrapper/>*/}
                        <GoogleLoginWrapper/>

                        <p>New user? Sign Up <Link to={'/signup'}>here</Link></p>
                    </div>


                </form>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    state = state.loginReducer;
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (username, password) => dispatch(login(username, password))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);