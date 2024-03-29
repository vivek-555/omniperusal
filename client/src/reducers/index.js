import {combineReducers} from 'redux';
import loginReducer from './login';
import signupReducer from './signup';
import tasksReducer from './task';

const reducers = combineReducers({loginReducer, signupReducer, tasksReducer});

export default reducers;
