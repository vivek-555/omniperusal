import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../actions/signup'
import {Link} from 'react-router';
import {browserHistory} from 'react-router'


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.create_user = this.create_user.bind(this);
        this.handleSuccessfulSignUpRedirect =
            this.handleSuccessfulSignUpRedirect.bind(this);
    }

    create_user(event) {
        event.stopPropagation();
        event.preventDefault();

        let password = event.currentTarget.form.password.value;
        let name = event.currentTarget.form.name.value;
        let email = event.currentTarget.form.email.value;

        this.props.create_user(name, email, password);
    }

    componentWillUpdate() {
        this.handleSuccessfulSignUpRedirect();
    }

    handleSuccessfulSignUpRedirect() {
        //TODO: For some reason the props values are inconsistent here
        if(this.props.sign_up_success) {
            browserHistory.push('/');
        }
    }

    render() {
        //TODO: Fix the props inconsistency issue and remove this logic from here
        if(this.props.sign_up_success) {
            browserHistory.push('/');
        }

        return (
            <div className="login-container">
                <h3>Sign Up</h3>

                {(this.props.sign_up_success ?
                    <h3>SignUp successful. Click <Link to={'/'}>here</Link> to log in.</h3> : <h3></h3>)}

                {(this.props.error ? <h3>There was some error. Please try again</h3> : <h3></h3>)}

                {(this.props.show_loader ? <h3>Please wait</h3> : <form>
                    <div className="imgcontainer">
                        {/*<img src={require("../resources/images/icon_signup_dude.png")} alt="Avatar"*/}
                        {/*className="sign_up_image"/>*/}
                    </div>
                    <div className="container">
                        <label><b>Name</b></label>
                        <input type="text" placeholder="Enter Name" name="name" required/>

                        <label><b>Email</b></label>
                        <input type="email" placeholder="Enter Email" name="email" required/>

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password"
                               required/>

                        <button onClick={this.create_user}>SignUp</button>
                        <p>Existing user? Sign In <Link to={'/'}>here</Link></p>
                    </div>


                </form>)}


            </div>
        );
    }
}

const mapStateToProps = function(state) {
    state = state.signupReducer;
    let sign_up_success = !!state.email;

    return {
        ...state,
        sign_up_success: sign_up_success
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        create_user: (name, email, password) => dispatch(signup(name, email, password))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);