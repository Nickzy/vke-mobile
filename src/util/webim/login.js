import webim from './sdk';

/**
 * 登录云通信
 */
function login (loginInfo, ckOK, ckError) {
    // let loginInfo = {
    //     sdkAppID: '1400030716', // 云通信应用信息面的sdkAppID
    //     accountType: 8341,
    //     identifier: 'Danny',
    //     identifierNick: '志鹏',
    //     userSig: '',
    // };
    let options = {
        isAccessFormalEnv: true, // 是-访问正式环境下的后台接口，否-访问测试环境下的后台接口
        isLogOn: true, // 是-开启日志，否-关闭日志
    };

    let listeners = {
        'onConnNotify': onConnNotify, // 监听连接状态回调变化事件,必填
        // 'onMsgNotify': onMsgNotify, // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        // 'onBigGroupMsgNotify': onBigGroupMsgNotify, // 监听新消息(直播聊天室)事件，直播场景下必填
        // 'onGroupSystemNotifys': onGroupSystemNotifys, // 监听（多终端同步）群系统消息事件，如果不需要监听，可不填
        // 'onGroupInfoChangeNotify': onGroupInfoChangeNotify, // 监听群资料变化事件，选填
        // 'onFriendSystemNotifys': onFriendSystemNotifys, // 监听好友系统通知事件，选填
        // 'onProfileSystemNotifys': onProfileSystemNotifys, // 监听资料系统（自己或好友）通知事件，选填
        // 'onKickedEventCall': onKickedEventCall, // 被其他登录实例踢下线
        // 'onC2cEventNotifys': onC2cEventNotifys, // 监听C2C系统消息通道
    };
    webim.login(loginInfo, listeners, options, ckOK, ckError);
}

/**
 * 监听连接状态回调变化事件
 */
function onConnNotify (resp) {
    let info;
    switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
            // 处理连接成功的代码
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
            break;
        case webim.CONNECTION_STATUS.OFF:
            // 处理网络断开的代码
            info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
        case webim.CONNECTION_STATUS.RECONNECT:
            // 处理网络恢复的代码
            info = '连接状态恢复正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
        default:
            // 处理未知状态的代码
            webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
            break;
    }
}

/**
 * 监听新消息事件
 * newMsgList 为新消息数组，结构为[Msg]
 */
// function onMsgNotify (newMsgList) {
// var sess, newMsg;
// // 获取所有聊天会话
// var sessMap = webim.MsgStore.sessMap();

// for (var j in newMsgList) {// 遍历新消息
//     newMsg = newMsgList[j];
//     if (newMsg.getSession().id() == selToID) {// 为当前聊天对象的消息
//         selSess = newMsg.getSession();
//         // 在聊天窗体中新增一条消息
//         // console.warn(newMsg);
//         // addMsg(newMsg);
//     }
// }
// // 消息已读上报，以及设置会话自动已读标记
// webim.setAutoRead(selSess, true, true);

// for (var i in sessMap) {
//     sess = sessMap[i];
//     if (selToID != sess.id()) {// 更新其他聊天对象的未读消息数
//         updateSessDiv(sess.type(), sess.id(), sess.unread());
//     }
// }
// }
export default login;
