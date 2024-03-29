import React, {Component} from 'react';
import {connect} from 'react-redux';
import {facebookLogin} from '../actions/login'
import FacebookLogin from 'react-facebook-login'


class FacebookLoginWrapper extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
    }

    handleOnClick() {
        debugger;
    }

    handleCallback(response) {
        debugger;
        this.props.authenticate(response)
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="408854439515358"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.handleOnClick}
                    callback={this.handleCallback}/>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (response) => dispatch(facebookLogin(response))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginWrapper);