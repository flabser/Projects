import { combineReducers } from 'redux';
import task from './task';
import project from './project';

const rootReducer = combineReducers({
    task, project
});

export default rootReducer
