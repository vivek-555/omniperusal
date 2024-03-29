import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router'

class EnsureLoggedInWrapper extends Component {
    constructor(props) {
        super(props);

        this.handleUnauthorizedRedirect = this.handleUnauthorizedRedirect.bind(this);
    }

    componentWillMount() {
        this.handleUnauthorizedRedirect();
    }

    componentWillUpdate() {
        this.handleUnauthorizedRedirect();
    }

    handleUnauthorizedRedirect() {
        if(!localStorage.getItem("authToken")) {
            browserHistory.replace('/');
        }
    }

    render() {
        if(!localStorage.getItem("authToken")) {
            return null;
        }

        return this.props.children;
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInWrapper);