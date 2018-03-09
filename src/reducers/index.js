import {combineReducers} from 'redux';
import message from './message';
import disMsg from './discussMsg';
import course from './courseItem';
import courselist from './course';
import lecturers from './lecturerList';
export const rootReducer = combineReducers({
    message,
    disMsg,
    course,
    courselist,
    lecturers,
});
