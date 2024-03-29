import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTask} from '../actions/task'
import GooglePlacesDropdown from '../components/GooglePlacesDropdown'
import DateTimePicker from '../components/DateTimePicker'
import {Link, browserHistory} from 'react-router';


class AddTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            googlePlace: ''
        };

        this.addTask = this.addTask.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    handleLocationChange(googlePlace) {
        this.setState({
            googlePlace
        });
    }

    addTask(event) {
        event.preventDefault();

        let _this = this;

        try {
            let form = event.currentTarget.form;

            let taskData = {
                name: form.name.value,
                description: form.description.value,
                budget: form.budget.value,
                google_place: _this.state.googlePlace
            };

            this.props.addTask(taskData);
        }
        catch(e) {
            console.log('Task Creation Failed.')
        }
    }

    render() {
        let sectionToBeRendered = <div/>;

        let messageSection = <h3/>;

        if(this.props.error) {
            messageSection = <h3>There was some error. Please try again</h3>;
        }
        else if(this.props.task) {
            messageSection = <h3>Saved Successfully!</h3>;
        }

        if(this.props.loading) {
            sectionToBeRendered = <h3>Please wait</h3>;
        }
        else {
            sectionToBeRendered = <form>
                <div className="container">
                    <label><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required/>

                    <label><b>Budget</b></label>
                    <input type="text" placeholder="Enter Budget" name="budget" required/>

                    <label><b>Description</b></label>
                    <input type="text" placeholder="Enter Description" name="description" required/>

                    <label><b>Location</b></label>
                    <GooglePlacesDropdown handleLocationChange={this.handleLocationChange}/>

                    <label><b>Deadline</b></label>
                    <DateTimePicker/>

                    <button onClick={this.addTask}>Add Task</button>

                    {/*<p>Back to Tasks listing <Link to={'/tasks'}>here</Link></p>*/}
                </div>
            </form>;
        }

        return (
            <div className="login-container">
                <h3>Add Task</h3>
                {messageSection}
                {sectionToBeRendered}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    state = state.tasksReducer;

    return {
        ...state.newTask
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (params) => dispatch(createTask(params))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddTask);