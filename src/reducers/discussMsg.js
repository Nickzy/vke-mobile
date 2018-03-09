import Immutable from 'immutable';
const disMsg = Immutable.List([]);
// const disMsg = [];
export function handleHistoryMsgDis (data) {
    return {
        type: 'HISTORY_DISMSG',
        msg: data,
    };
}
export function addMsgDis (data) {
    return {
        type: 'ADD_DISMSG',
        msg: data,
    };
}
export function repMsgDis (data) {
    return {
        type: 'REP_DISMSG',
        msg: data,
    };
}
function replaceDis (state, msg) {
    let newState = state.map((item, index) => {
        if (item.seq === msg.seq) {
            item = msg;
        }
        return item;
    });
    return newState;
}
export default function msgDisReducer (state = disMsg, action) {
    // console.log('dis reducer action', action);
    // console.log('dis reducer', state);
    switch (action.type) {
        case 'ADD_DISMSG' :
            // return [...state, action.msg];
            return Immutable.List(state).push(action.msg);
            break;
        case 'HISTORY_DISMSG' :
            return Immutable.List(action.msg).concat(state);
            // return [...action.msg, ...state];
            break;
        case 'REP_DISMSG' :
            return replaceDis(state, action.msg);
            break;
        default: return state;
    }
}
