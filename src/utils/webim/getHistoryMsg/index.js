import {webim} from '../../../utils/webim';
import {showMsg} from '../login/login';
import {convertMsgtoHtml} from '../converMsg';
import store from '../../../store';
import {handleHistoryMsg } from '../../../reducers/message';
import {handleHistoryMsgDis } from '../../../reducers/discussMsg';
function getGroupInfo (group_id, cbOK, cbErr) {
    var options = {
        'GroupIdList': [
            group_id,
        ],
        'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption',
            'ShutUpAllMember',
        ],
        'MemberInfoFilter': [
            'Account',
            'Role',
            'JoinTime',
            'LastSendMsgTime',
            'ShutUpUntil',
        ],
    };
    webim.getGroupInfo(
        options,
        function (resp) {
            if (resp.GroupInfo[0].ShutUpAllMember == 'On') {
                alert('该群组已开启全局禁言');
            }
            if (cbOK) {
                cbOK(resp);
            }
        },
        function (err) {
            console.log('qun裙', err.ErrorInfo);
        }
    );
}
// 获取最新的群历史消息,用于切换群组聊天时，重新拉取群组的聊天消息
var ReqMsgSeq = null;
var DisReqMsgSeq = null;
function getLastGroupHistoryMsgs (selToID, selfType, size, cbOk) {
    // if (selType == webim.SESSION_TYPE.C2C) {
    //     alert('当前的聊天类型为好友聊天，不能进行拉取群历史消息操作');
    //     return;
    // }
    // let selToID = '5a165844562af81df4049eda';
    getGroupInfo(selToID, function (resp) {
        // 拉取最新的群历史消息
        changeSeq(selfType, resp.GroupInfo[0].NextMsgSeq - 1);
        var options = {
            'GroupId': selToID,
            'ReqMsgSeq': resp.GroupInfo[0].NextMsgSeq - 1,
            'ReqMsgNumber': size,
        };
        if (options.ReqMsgSeq == null || options.ReqMsgSeq == undefined || options.ReqMsgSeq <= 0) {
            webim.Log.warn('该群还没有历史消息:options=' + JSON.stringify(options));
            return;
        }
        webim.syncGroupMsgs(
            options,
            function (msgList) {
                // console.log('裙消息', msgList);
                if (msgList.length == 0) {
                    webim.Log.warn('该群没有历史消息了:options=' + JSON.stringify(options));
                    return;
                }
                let msgArr = msgList.map((item) => convertMsgtoHtml(item));
                // console.log(msgArr);
                changeSeq(selfType, msgList[0].seq - 1);
                if (cbOk) {cbOk(msgArr);}
            },
            function (err) {
                console.log('系哦系', err.ErrorInfo);
            }
        );
    });
}

// 向上翻页，获取更早的群历史消息
function getPrePageGroupHistoryMsgs (size, selfType, cbOk) {
    // if (selType == webim.SESSION_TYPE.C2C) {
    //     alert('当前的聊天类型为好友聊天，不能进行拉取群历史消息操作');
    //     return;
    // }
    if (ReqMsgSeq <= 0) {
        webim.Log.warn('该群没有历史消息可拉取了');
        return;
    }
    let selToID = '';
    let selfSeq = null;
    if (selfType === 'live') {
        selfSeq = ReqMsgSeq;
        selToID = '5a1519e0562af837d8ef3f02';
    } else {
        selfSeq = DisReqMsgSeq;
        selToID = '5a165844562af81df4049eda';
    }
    var options = {
        'GroupId': selToID,
        'ReqMsgSeq': selfSeq,
        'ReqMsgNumber': size, // 每次显示的条数（webim最大20）
    };
    // console.log('100在此' + selfSeq);
    // console.log('拉去消息尺寸', size);
    // console.log('消息直播间id', selToID);
    webim.syncGroupMsgs(
        options,
        function (msgList) {
            // console.log('拉取随便', msgList);
            if (cbOk) {cbOk(msgList);}
            if (msgList.length == 0) {
                webim.Log.warn('该群没有历史消息了:options=' + JSON.stringify(options));
                return;
            }
            let msgArr = msgList.map((item) => convertMsgtoHtml(item));
            console.log('拉取历史消息返回数', msgArr);
            changeSeq(selfType, msgList[0].seq - 1);
            // ReqMsgSeq = msgList[0].seq - 1;
            dispatchMsg(selfType, msgArr);
            // store.dispatch(handleHistoryMsg(msgArr));
        },
        function (err) {
            console.log('拉取错误' + err);
        }
    );
}
function dispatchMsg (selfType, arr) {
    if (selfType === 'live') {
        store.dispatch(handleHistoryMsg(arr));
    } else {
        store.dispatch(handleHistoryMsgDis(arr));
    }
}
function changeSeq (selfType, seq) {
    if (selfType === 'live') {
        ReqMsgSeq = seq;
    } else {
        DisReqMsgSeq = seq;
    }
}
export {
    getLastGroupHistoryMsgs,
    getPrePageGroupHistoryMsgs,
};
