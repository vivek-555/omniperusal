import * as actionTypes from '../actionTypes/task';
import {get, post, del} from '../utils/api';

/**************************************************************************
 * Task Listing
 **************************************************************************/
export function getTasks(params) {
    return async dispatch => {
        dispatch({
            type: actionTypes.GET_TASKS
        });

        try {
            const result = await get('/api/v1/tasks/', params);
            const tasks = result && result.results;

            dispatch(getTasksSuccess(tasks));
        }
        catch(e) {
            dispatch(getTasksFailure(e));
        }
    }
}

export function getTasksSuccess(items) {
    return {
        type: actionTypes.GET_TASKS_SUCCESS,
        payload: items || []
    };
}

export function getTasksFailure(error) {
    return {
        type: actionTypes.GET_TASKS_FAILURE,
        payload: error
    };
}

export function toggleTasksType(tasksType) {
    return async dispatch => {
        if(!tasksType) {
            return;
        }

        dispatch({
            type: actionTypes.TOGGLE_TASKS_TYPE,
            payload: tasksType
        });

        let params = {};

        if(tasksType === 'MY_TASKS') {
            params.owner__email = localStorage.getItem('email');
        }

        dispatch(getTasks(params));
    }
}

/**************************************************************************
 * Task Create
 **************************************************************************/
export function createTaskSuccess(task) {
    return {
        type: actionTypes.CREATE_TASK_SUCCESS,
        payload: task
    };
}

export function createTaskFailure(error) {
    return {
        type: actionTypes.CREATE_TASK_FAILURE,
        payload: error
    };
}

export function createTask(params) {
    return async dispatch => {
        dispatch({
            type: actionTypes.CREATE_TASK
        });

        try {
            let result = await post('/api/v1/tasks/', params);
            dispatch(createTaskSuccess(result));
        }
        catch(e) {
            dispatch(createTaskFailure(e));
        }
    }
}

/**************************************************************************
 * Task Update
 **************************************************************************/
export function taskUpdateError(updateError) {
    return {
        type: actionTypes.TASK_UPDATE_ERROR,
        payload: updateError
    };
}

/**************************************************************************
 * Task Delete
 **************************************************************************/
export function deleteTask(taskId, task = {}) {
    return async dispatch => {
        dispatch({
            type: actionTypes.DELETE_TASK
        });

        try {
            let result = await del('/api/v1/tasks/' + taskId + '/');

            dispatch(deleteTaskSuccess(task));
        }
        catch(e) {
            dispatch(deleteTaskFailure(e));
        }
    }
}

export function deleteTaskSuccess(taskDeleted) {
    return {
        type: actionTypes.DELETE_TASK_SUCCESS,
        payload: taskDeleted
    };
}

export function deleteTaskFailure(deletionError) {
    return {
        type: actionTypes.DELETE_TASK_FAILURE,
        payload: deletionError
    };
}