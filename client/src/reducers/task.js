import * as actionTypes from '../actionTypes/task';

const INITIAL_STATE = {
    taskList: {
        tasks: [],
        error: null,
        loading: false
    },
    newTask: {
        task: null,
        error: null,
        loading: false
    },
    activeTask: {
        task: null,
        error: null,
        loading: false
    },
    deletedTask: {
        task: null,
        error: null,
        loading: false
    },
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        /**************************************************************************
         * Tasks Loading
         **************************************************************************/
        case actionTypes.GET_TASKS:
            return {
                ...state,
                taskList: {
                    tasks: [],
                    error: null,
                    loading: true
                }
            };
        case actionTypes.GET_TASKS_SUCCESS:
            return {
                ...state,
                taskList: {
                    tasks: action.payload,
                    error: null,
                    loading: false
                }
            };
        case actionTypes.GET_TASKS_FAILURE:
            error = action.payload;
            return {
                ...state,
                taskList: {
                    tasks: [],
                    error: error,
                    loading: false
                }
            };
        case actionTypes.RESET_TASKS:
            return {
                ...state,
                taskList: {
                    tasks: [],
                    error: null,
                    loading: false
                }
            };
        case actionTypes.TOGGLE_TASKS_TYPE:
            return {
                ...state,
                taskList: {
                    ...state.taskList,
                    taskType: action.payload
                }
            };


        /**************************************************************************
         * Task Loading
         **************************************************************************/
        case actionTypes.GET_TASK:
            return {
                ...state,
                activeTask: {
                    ...state.activeTask,
                    loading: true
                }
            };
        case actionTypes.GET_TASK_SUCCESS:
            return {
                ...state,
                activeTask: {
                    task: action.payload,
                    error: null,
                    loading: false
                }
            };
        case actionTypes.GET_TASK_FAILURE:
            error = action.payload;
            return {
                ...state,
                activeTask: {
                    task: null,
                    error: error,
                    loading: false
                }
            };
        case actionTypes.RESET_ACTIVE_TASK:
            return {
                ...state,
                activeTask: {
                    task: null,
                    error: null,
                    loading: false
                }
            };

        /**************************************************************************
         * Task Creation
         **************************************************************************/
        case actionTypes.CREATE_TASK:
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    loading: true
                }
            };
        case actionTypes.CREATE_TASK_SUCCESS:
            return {
                ...state,
                newTask: {
                    task: action.payload,
                    error: null,
                    loading: false
                }
            };
        case actionTypes.CREATE_TASK_FAILURE:
            error = action.payload;
            return {
                ...state,
                newTask: {
                    task: null,
                    error: error,
                    loading: false
                }
            };
        case actionTypes.RESET_NEW_TASK:
            return {
                ...state,
                newTask: {
                    task: null,
                    error: null,
                    loading: false
                }
            };

        /**************************************************************************
         * Task Deletion
         **************************************************************************/
        case actionTypes.DELETE_TASK:
            return {
                ...state,
                deletedTask: {
                    ...state.deletedTask,
                    loading: true
                }
            };
        case actionTypes.DELETE_TASK_SUCCESS:
            return {
                ...state,
                deletedTask: {
                    task: action.payload,
                    error: null,
                    loading: false
                }
            };
        case actionTypes.DELETE_TASK_FAILURE:
            error = action.payload;
            return {
                ...state,
                deletedTask: {
                    task: null,
                    error: error,
                    loading: false
                }
            };
        case actionTypes.RESET_DELETED_TASK:
            return {
                ...state,
                deletedTask: {
                    task: null,
                    error: null,
                    loading: false
                }
            };
        default:
            return state;
    }
}