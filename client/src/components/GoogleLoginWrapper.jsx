import React, {Component} from 'react';
import {connect} from 'react-redux';
import {googleLogin} from '../actions/login'
import GoogleLogin from 'react-google-login'


class GoogleLoginWrapper extends Component {
    constructor(props) {
        super(props);

        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
    }

    handleSuccess(response) {
        this.props.authenticate(response);
        debugger;
    }

    handleFailure(response) {
        debugger;
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="173708707523-1pjav56rqnh545t8hrg6gp90u80nbe0e.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={this.handleSuccess}
                    onFailure={this.handleFailure}/>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (response) => dispatch(googleLogin(response))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginWrapper);