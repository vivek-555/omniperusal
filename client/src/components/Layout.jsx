import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from '../components/Footer'
import TopNav from '../components/TopNav'


class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopNav/>
                <div className="container wrapper">
                    {this.props.children}
                </div>
                <Footer/>
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