import Immutable from 'immutable';
const message = Immutable.List([]);
// const message = [];
export function handleHistoryMsg (data) {
    return {
        type: 'HISTORY_MSG',
        msg: data,
    };
}
export function addMsg (data) {
    return {
        type: 'ADD_MSG',
        msg: data,
    };
}

export function repMsg (data) {
    return {
        type: 'REP_MSG',
        msg: data,
    };
}
function replace (state, msg) {
    let newState = state.map((item, index) => {
        if (item.random === msg.random && item.userInfo.studentId === msg.userInfo.studentId) {
            item = msg;
        }
        return item;
    });
    return newState;
}

export default function msgReducer (state = message, action) {
    console.log('msg reducer action', action);
    console.log('msg reducer', state);
    switch (action.type) {
        case 'ADD_MSG' :
            return Immutable.List(state).push(action.msg);
            break;
        case 'HISTORY_MSG' :
            return Immutable.List(action.msg).concat(state);
            break;
        case 'REP_MSG' :
            return replace(state, action.msg);
            break;
        default: return state;
    }
}
