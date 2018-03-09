import Immutable from 'immutable';
const course = {};
function courseInit (data) {
    return {
        type: 'COURSE_INIT',
        course: data,
    };
}
function collectCourse (boolean) {
    return {
        type: 'COURSE_IS_COLECT',
        status : boolean,
    }
}
function overCourse () {
    return {
        type: 'COURSE_OVER',
        status: '已经结束'
    }
}
function courseEmpty () {
    return {
        type: 'COURSE_EMPTY',
        course: {}
    }
}
export default function courseReducer (state = course, action) {
    // console.log('课程详情 reducer', action)
    switch (action.type) {
        case 'COURSE_INIT' :
            return {...state,...action.course};
            break;
        case 'COURSE_IS_COLECT' :
            return {...state, isCollect: action.status};
            break;
        case 'COURSE_OVER' :
            return {...state, status: action.status};
            break;
        case 'COURSE_EMPTY' :
            return action.course;
            break;
        case 'COURSE_OVER' :
            return {...state, status: action.status}
            break; 
        default : return state
    }
}

export {
    courseInit,
    collectCourse,
    courseEmpty,
    overCourse,
}
