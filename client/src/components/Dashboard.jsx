import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router'
import AddTaskPage from '../pages/AddTaskPage'
import TasksPage from '../pages/TasksPage'


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userDetails = this.props.userDetails;

        return (
            <div>
                <h3>
                    Welcome {userDetails.first_name || userDetails.email}
                </h3>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#browse_tasks">Browse Tasks</a></li>
                        <li><a data-toggle="tab" href="#opened_tasks">Opened Tasks</a></li>
                        <li><a data-toggle="tab" href="#picked_tasks">Picked Tasks</a></li>
                        <li><a data-toggle="tab" href="#add_task">Add Task</a></li>
                    </ul>

                    <div className="tab-content">
                        <div id="browse_tasks" className="tab-pane fade in active">
                            <h3>Browse Tasks</h3>
                            <TasksPage taskType="ALL_TASKS"/>
                        </div>
                        <div id="opened_tasks" className="tab-pane fade">
                            <h3>Opened Tasks</h3>
                            <TasksPage taskType="MY_TASKS"/>
                        </div>
                        <div id="picked_tasks" className="tab-pane fade">
                            <h3>Picked Tasks</h3>
                            <TasksPage taskType="MY_TASKS"/>
                        </div>
                        <div id="add_task" className="tab-pane fade">
                            <AddTaskPage/>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);