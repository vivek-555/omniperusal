import React, {Component} from 'react';
import TaskList from '../components/TaskList'


export default class TasksPage extends Component {
    render() {
        return (
            <div>
                <TaskList {...this.props}/>
            </div>
        );
    }
}