import Immutable from 'immutable';
const course = Immutable.Map({newList: [], category: [], sliderList: []});
function allCourse (data) {
    return {
        type: 'ALL_COURSE',
        list: data,
    };
}
function handelList (data) {
    let newData = data.courseLiving.courseList;
    let arr = newData.filter((item) => item.status === '正在直播');
    let arrS = newData.filter((item) => item.status === '报名中');
    let hisArr = data.courseHistory.courseList;
    console.log('reducer 处理课程列表', arr.concat(arrS).concat(hisArr));
    let aa = Immutable.Map(data);
    let newResult = aa.set('newList', arr.concat(arrS).concat(hisArr));
    console.log('转化程对象courselist中', newResult.toObject());
    return newResult;
}
function categoryList (data) {
    return {
        type: 'CATEGORY_LIST',
        list: data,
    };
}
function handelCategory (state, data) {
    console.log('handelCategory', data);
    let newResult = state.set('newList', data.courseList);
    return newResult;
}
export default function courseReducer (state = course, action) {
    switch (action.type) {
        case 'ALL_COURSE':
            return handelList(action.list);
            break;
        case 'CATEGORY_LIST':
            return handelCategory(state, action.list);
            break;
        default: return state;
    }
}

export {
    allCourse,
    categoryList,
};
