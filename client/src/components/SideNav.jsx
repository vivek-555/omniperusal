import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router'
import Logout from '../components/Logout'


class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);