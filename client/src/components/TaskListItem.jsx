import React, {Component} from 'react';


class TaskListItem extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete() {
        let task = this.props.task,
            handleDelete = this.props.deleteTask;

        if(task && task.id && handleDelete && typeof handleDelete === 'function') {
            handleDelete(task.id, task);
        }
    }

    handleEdit() {
        let task = this.props.task,
            handleEdit = this.props.editTask;

        if(task && task.id && handleEdit && typeof handleEdit === 'function') {
            handleEdit(task.id);
        }
    }

    render() {
        let task = this.props.task,
            taskDetailSection;

        if(task) {
            let googlePlace = task.google_place || {};

            taskDetailSection = <tr>
                <td>{task.description}</td>
                <td>{googlePlace.formatted_address}</td>
                <td>{task.owner}</td>
                <td>

                </td>
            </tr>;

            let googlePlaceLink = googlePlace.url || 'javascript:void(0)';

            taskDetailSection = <tr>
                <td>
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <span>{task.description}</span>
                                <span> for Rs. </span>
                                <span>{task.budget}</span>
                            </div>
                            <div>
                                <a href={googlePlaceLink} target="_blank">{googlePlace.formatted_address}</a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" onClick={this.handleEdit}>Edit</a>&nbsp;
                                <a href="javascript:void(0)" onClick={this.handleDelete}>Delete</a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <span>opened at: </span>
                                <span>{task.created_on}</span>
                            </div>
                            <div>
                                <span>closing at: </span>
                                <span>{task.deadline}</span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        }

        return taskDetailSection;
    }
}

export default TaskListItem;