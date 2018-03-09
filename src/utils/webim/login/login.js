import {webim} from '../../webim';
import {showMsg} from '../showMsg';
import {getLastGroupHistoryMsgs} from '../getHistoryMsg';
import store from '../../../store';
import {handleHistoryMsg } from '../../../reducers/message';
import {handleHistoryMsgDis } from '../../../reducers/discussMsg';
function onConnNotify (resp) {
    switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
            // webim.Log.warn('连接状态正常...');
            console.log('网络正常');
            break;
        case webim.CONNECTION_STATUS.OFF:
            webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
            window.location.reload();
            break;
        default:
            webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
            window.location.reload();
            break;
    }
}
// 位于js/demo_base.js中
// IE9(含)以下浏览器用到的jsonp回调函数
function jsonpCallback (rspData) {
    // 设置jsonp返回的
    webim.setJsonpLastRspData(rspData);
}
// 监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify (msgList) {
    console.log(msgList);
    for (var i = msgList.length - 1; i >= 0; i--) {// 遍历消息，按照时间从后往前
        var msg = msgList[i];
        webim.Log.error('receive a new group msg: ' + msg.getFromAccountNick());
        // 显示收到的消息
        // showMsg(msg);
    }
}
// 监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
function onMsgNotify (newMsgList) {
    var newMsg;
    for (var j in newMsgList) {// 遍历新消息
        newMsg = newMsgList[j];
        console.log('监听发送的新消息', newMsg);
        showMsg(newMsg);
    }
}
// 进入直播间
function applyJoinGroup (groupId, login) {
    var options = {
        'GroupId': groupId, // 群id
        'UserDefinedField': 'student',
    };
    webim.applyJoinGroup(
        options,
        function (resp) {
            // JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
            if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                webim.Log.info('进群成功');
                selToID = groupId;
            } else {
                console.log('进群失败');
            }
        },
        function (err) {
            console.info('joinErr', err);
        }
    );
}
var loginInfoDef = {
    sdkAppID: '1400023689',
    appIDAt3rd: '1400023689',
    accountType: '8341',
    identifier: '59e59330562af80df36612f5',
    identifierNick: '远方的我房间',
    liveId: '5a165844562af81df4049eda',
    userSig: 'eJxFkF1Pg0AQRf8Lrxrdjy5lTXwg9CNYSmKhjeVlg*yCE4Suy9Zgjf9dJCW*3nMnM2e*nTRK7nKtQYrcCmqk8*Ag53aMVa-BKJGXVpkhxowxgtBEP5Xp4NQOgCDMMKEI-UOQqrVQwjjIuGKcUsRckpcekiV1XUxKdu12UA2l7XIfhM*LaBOppOsbniFY7wsvtYfaqK3Ps3R36eY3lf*k4SXODpsqrBbHPn3v5DlZxTVaGhoEiYaw8tdN-WHfduboXu7r*HVltPc4LZO1GHX-hGbDwYS6Hr9CC40aRTGe8Tlmk01eFKdza4X90mr8z88veeRcuQ__',
};
// sdk登录
function sdkLogin (loginInfo) {
    loginInfo = loginInfo || loginInfoDef;
    let listeners = {
        'onConnNotify': onConnNotify, // 选填
        'jsonpCallback': jsonpCallback, // IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
        'onBigGroupMsgNotify': onBigGroupMsgNotify, // 监听新消息(大群)事件，必填
        'onMsgNotify': onMsgNotify, // 监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        // 'onGroupSystemNotifys': onGroupSystemNotifys, // 监听（多终端同步）群系统消息事件，必填
        // 'onGroupInfoChangeNotify': onGroupInfoChangeNotify, // 监听群资料变化事件，选填
    };
    let options = {
        'isAccessFormalEnv': true, // 是否访问正式环境，默认访问正式，选填
        'isLogOn': false, // 是否开启控制台打印日志,默认开启，选填
    };
    // web sdk 登录
    webim.login(loginInfo, listeners, options,
        function (res) {
            console.log('webim登录', res);
            // console.log('denglulogin', loginInfo);
            if (res.ActionStatus === 'OK') {
                // sessionStorage.setItem('jionGrop', 'success');
                getLastGroupHistoryMsgs(loginInfo.liveId, 'live', 20, (res) => {
                    store.dispatch(handleHistoryMsg(res));
                });
                getLastGroupHistoryMsgs('5a165844562af81df4049eda', 'discuss', 20, (res) => {
                    store.dispatch(handleHistoryMsgDis(res));
                });
                // webim.syncMsgs(function (res) {
                //     console.log('未读消息', res);
                // }, function (err) {
                //     console.log('未读消息', err);
                // });
            }
        },
        function (err) {
            console.log(err);
        }
    );
}
export {
    sdkLogin,
};
