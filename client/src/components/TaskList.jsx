import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTasks, deleteTask, toggleTasksType} from '../actions/task';
import TaskListItem from './TaskListItem';
import {Link, browserHistory} from 'react-router';


class TaskList extends Component {
    constructor(props) {
        super(props);

        this.handleTasks = this.handleTasks.bind(this);
    }

    componentDidMount() {
        this.props.toggleTasksType(this.props.taskType);
        this.handleTasks();
    }

    handleTasks(params = {}) {
        this.props.getTasks(params);
    }

    render() {
        let _this = this;

        let sectionToBeRendered = <div/>;

        let taskList = this.props.taskList,
            error = taskList.error,
            loading = taskList.loading,
            tasks = taskList.tasks;

        if(error) {
            sectionToBeRendered = <h3>{error}</h3>;
        }
        else if(loading) {
            sectionToBeRendered = <h3>Loading... Please wait...</h3>;
        }
        else if(tasks && tasks.length) {
            sectionToBeRendered = tasks.map((task, index) => {
                return <TaskListItem key={index}
                                     task={task}
                                     deleteTask={_this.props.deleteTask}/>;
            });

            sectionToBeRendered =
                <table className="table table-hover">
                    {/*<thead>*/}
                    {/*<tr>*/}
                        {/*<th>Description</th>*/}
                        {/*<th>Address</th>*/}
                        {/*<th>Owner</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody>
                    {sectionToBeRendered}
                    </tbody>
                </table>
        }
        else {
            sectionToBeRendered = <h3>No tasks found</h3>
        }

        let messageSection = '';

        if(_this.props.deletedTask.task) {
            messageSection = <h3>
                {'Task deleted: ' + _this.props.deletedTask.task.id}
            </h3>;
        }

        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {messageSection}
                </div>
            </div>
            {/*<div className="row">*/}
            {/*<div className="col-md-12">*/}
            {/*<Link to={'/add_task'}>Add Task</Link>*/}
            {/*&nbsp;&nbsp;&nbsp;*/}
            {/*<a href="javascript:void(0)" onClick={() => {*/}
            {/*this.props.toggleTasksType('MY_TASKS')*/}
            {/*}}>*/}
            {/*My Tasks*/}
            {/*</a>*/}
            {/*&nbsp;&nbsp;&nbsp;*/}
            {/*<a href="javascript:void(0)" onClick={() => {*/}
            {/*this.props.toggleTasksType('ALL_TASKS')*/}
            {/*}}>*/}
            {/*All Tasks*/}
            {/*</a>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="row">
                <div className="col-md-12">
                    {sectionToBeRendered}
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = function(state) {
    state = state.tasksReducer;

    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: (params) => dispatch(getTasks(params)),
        deleteTask: (taskId, task) => dispatch(deleteTask(taskId, task)),
        toggleTasksType: (params) => dispatch(toggleTasksType(params)),
        // editTask: (taskId, params) => dispatch(editTask(taskId, taskId)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);