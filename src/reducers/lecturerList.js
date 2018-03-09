import Immutable from 'immutable';
const lecturer = Immutable.Map({});
function getFirstLecturer (data) {
    return {
        type: 'FIRST_LECTURER_LIST',
        list: data,
    };
}
export default function lecturerReducer (state = lecturer, action) {
    // console.log('reducer 讲师列表', action);
    switch (action.type) {
        case 'FIRST_LECTURER_LIST':
            return Immutable.List(action.list.lecturerVer);
            break;
        default: return state;
    }
}

export {
    getFirstLecturer,
};
