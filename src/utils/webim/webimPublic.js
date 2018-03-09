import { webim } from '../webim';
// import store from '../../store/index';
'use strict';
let vlive;
let selToID = null;// 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）done
let courseId = null;
let brotherID = null;
let selSess = null;// 当前聊天会话
let selSessHeadUrl = null; // 群组头像 done
let loginInfo = null; // done
let selType = webim.SESSION_TYPE.GROUP;
// let avChatRoomId = null; // done
// if (selToID) {
//     avChatRoomId = selToID;// 用户自定义房间群id
// }
let userId = null; // 用户id
const webimPublic = (() => {
    // 设置云通信登录信息
    function setLoginInfo (info) {
        loginInfo = info;
        userId = info.identifier;
        selSessHeadUrl = info.selSessHeadUrl;
    }
    function setStatus (type) {
        switch (type) {
            case 'live':
                setLiveId(loginInfo.liveId, loginInfo.discussId);
                break;
            case 'discuss':
                setLiveId(loginInfo.discussId, loginInfo.liveId);
                break;
        }
    }
    // 获取courseId
    function setCourseId (id) {
        console.log(courseId);
        courseId = id;
    }
    // 获取liveId
    function setLiveId (liveId, broId) {
        selToID = liveId;
        brotherID = broId;
    }
    //
    function sess (sess) {
        sess = sess || selSess;
        if (!sess) {
            sess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        return sess;
    }
    function subType (status, type) {
        type = selType;
        if (type === webim.SESSION_TYPE.GROUP) {
            // 群消息子类型如下：
            // webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
            // webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
            // webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
            // webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
            switch (status) {
                case '点赞' :
                    type = webim.GROUP_MSG_SUB_TYPE.LOVEMSG;
                    break;
                case '提示' :
                    type = webim.GROUP_MSG_SUB_TYPE.TIP;
                    break;
                case '红包' :
                    type = webim.GROUP_MSG_SUB_TYPE.REDPACKET;
                    break;
                default :
                    type = webim.GROUP_MSG_SUB_TYPE.COMMON;
            }
        } else {
            // C2C消息子类型如下：
            // webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
            // type = webim.C2C_MSG_SUB_TYPE.COMMON;
        }
        return type;
    }
    return {
        setLoginInfo,
        setLiveId,
        setStatus,
        setCourseId,
        sess,
        subType,
    };
})();
export {
    vlive,
    selToID,
    courseId,
    selSess,
    selType,
    selSessHeadUrl,
    loginInfo,
    userId,
    brotherID,
    webimPublic,
};
