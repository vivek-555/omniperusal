import React, {Component} from 'react';
import {connect} from 'react-redux';
import Logout from '../components/Logout'


class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userDetails = this.props.userDetails;

        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="main-logo">omniperusal</div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <div className="dropdown">
                                    <button className="btn btn-link dropdown-toggle" type="button"
                                            data-toggle="dropdown">
                                        <i className="fa fa-user-circle-o" aria-hidden="true"/>&nbsp;
                                        <span>{userDetails.first_name || userDetails.email}</span>&nbsp;
                                        <span className="caret"/>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Logout/></li>
                                    </ul>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

const mapStateToProps = function(state) {
    return {
        userDetails: state.loginReducer.userDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);