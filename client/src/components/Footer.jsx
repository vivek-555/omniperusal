import React, {Component} from 'react';
import {connect} from 'react-redux';


class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="container-fluid text-center">
                <p>Billion Eyes Copyright</p>
            </footer>
        );
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);