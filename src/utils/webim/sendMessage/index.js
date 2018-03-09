import {webim} from '../../webim';
import {checkLogin} from '../login/checkLogin';
import store from '../../../store';
import {addMsg, repMsg} from '../../../reducers/message';
import {enUnicode} from '../../enUnicode';
import {webimPublic, selType} from '../webimPublic';
import {imgUrl} from '../../../config/urls';
import { addMsgDis, repMsgDis } from '../../../reducers/discussMsg';
let selToID = '5a1519e0562af837d8ef3f02';
let friendHeadUrl = '';
var loginInfo = {
    sdkAppID: '1400023689',
    appIDAt3rd: '1400023689',
    accountType: '8341',
    identifier: '59e59330562af80df36612f5',
    identifierNick: '远方的我房间',
};
let selSess = '';
let selSessHeadUrl = '7fabb4afbcbeffa166ec23819b0b4bef';
export const sendMsg = (() => {

    /**
     * 发送文本消息(普通消息)
     * @param msgtosend
     */
    function sendTxtMsg (msgtosend, selfMsgType, repeat) {
        repeat = repeat || '';
        // if (!checkLogin()) {
        //     return;
        // }
        // 转 Unicode  解决乱码问题
        const selfText = msgtosend;
        msgtosend = enUnicode(msgtosend);
        var msgLen = webim.Tool.getStrBytes(msgtosend);
        var maxLen, errInfo;
        if (selType === webim.SESSION_TYPE.GROUP) {
            maxLen = webim.MSG_MAX_LENGTH.GROUP;
            errInfo = '消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)';
        } else {
            maxLen = webim.MSG_MAX_LENGTH.C2C;
            errInfo = '消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)';
        }
        if (msgLen > maxLen) {
            console.log(errInfo);
            return;
        }
        let msg = setMsg();
        var data = JSON.stringify({
            text: msgtosend,
            type: 'text',
        });
        var desc = selfMsgType;
        var ext = 'text';
        // 解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgtosend.match(expr);
        var text_obj;
        if (!emotions || emotions.length < 1) {
            text_obj = new webim.Msg.Elem.Custom(data, desc, ext);
            msg.addCustom(text_obj);
        } else {// 有表情
            msg = expTxtMsg(msg, msgtosend);
        }
        console.log('发送的消息', msg.sess.id());
        !repeat && selfAllMsg(ext, selfText, msg.time, msg.random, 'uploading');// 在msgreducer中添加自定义消息
        !repeat && msgJSbef('text', selfText, selfMsgType);// 将发送消息转化json并存储session中
        webim.sendMsg(msg, function (resp) {
            webim.Log.info('发消息成功');
            sessionStorage.removeItem('sendMsg');// 删除session中之前存储的消息
        }, function (err) {
            webim.Log.error('发消息失败:' + err.ErrorInfo);
            selfAllMsg(ext, selfText, msg.time, msg.random, 'fail');
        });
    }

    /**
     * 发送图片消息
     * @param images
     */
    function sendImageMsg (images, repeat) {
        // if (!checkLogin()) {
        //     return;
        // }
        let msg = setMsg();
        var data = JSON.stringify({
            mediaId: images.id,
            type: images.type,
        });
        var desc = 'live';
        var ext = 'image';
        var images_obj = new webim.Msg.Elem.Custom(data, desc, ext);
        msg.addCustom(images_obj);
        !repeat && selfAllMsg(ext, images, msg.time, msg.random, 'uploading');
        !repeat && msgJSbef('image', images);
        // 调用发送图片接口
        webim.sendMsg(msg, function (resp) {
            if (selType == webim.SESSION_TYPE.C2C) {// 私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            }
            sessionStorage.removeItem('sendMsg');
            webim.Log.info('发消息成功');
        }, function (err) {
            selfAllMsg(ext, images, msg.time, msg.random, 'fail');
            webim.Log.error('发消息失败:' + err.ErrorInfo);
        });

    }

    /**
     * webim发送语音
     * @param {*} voiceId
     * @param {*} localId
     * @param {*} second
     * @param {*} tempId
     */
    function sendVoiceMsg (voiceId, localId, second, tempId, repeat) {
        // if (!checkLogin()) {
        //     return;
        // }
        let msg = setMsg();
        var ext = 'wxvoice';
        let msgInfo = {
            mediaId: voiceId,
            type: 'voice',
            dataLid: localId,
            second: second,
            tempId: tempId,
        };
        var data = JSON.stringify(msgInfo);
        var desc = 'wxvoice';
        var custom_obj = new webim.Msg.Elem.Custom(data, desc, ext);
        msg.addCustom(custom_obj);
        !repeat && selfAllMsg(ext, msgInfo, msg.time, msg.random, 'uploading');
        !repeat && msgJSbef('voice', voiceId, localId, second, tempId);
        // 调用发送消息接口
        webim.sendMsg(msg, function (resp) {
            if (selType == webim.SESSION_TYPE.C2C) {// 私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            }
            sessionStorage.removeItem('sendMsg');
        }, function (err) {
            console.log(err.ErrorInfo);
            selfAllMsg(ext, msgInfo, msg.time, msg.random, 'fail');
        });
    }
    // 重发消息
    function repeatSend () {
        let data = JSON.parse(sessionStorage.getItem('sendMsg'));
        if (!data) {
            return;
        }
        switch (data.type) {
            case 'text' :
                sendTxtMsg(data.one, data.two, 'repeat');
                break;
            case 'image' :
                sendImageMsg(data.one, 'repeat');
                break;
            case 'voice' :
                sendVoiceMsg(data.one, data.two, data.three, data.four, 'repeat');
                break;
        }

    }
    // 自定义文字表情消息
    function selfMsgTxt (ext, selfText, time, random, status) {
        let selfMsg = {
            infoType: ext,
            complete: status,
            msgInfo: {
                textContent: selfText,
            },
            time: time,
            random: random,
            userInfo: {
                studentId: loginInfo.identifier || 'unknown',
                nickName: loginInfo.identifierNick || 'unknown',
                avatar: loginInfo.selSessHeadUrl || '',
                type: '',
            },
        };
        return selfMsg;
    }
    // 自定义图片消息
    function selfMsgImg (ext, images, time, random, status) {
        let selfMsg = {
            infoType: ext,
            complete: status,
            msgInfo: {
                mediaId: imgUrl + '/' + images.id,
            },
            time: time,
            random: random,
            userInfo: {
                studentId: loginInfo.identifier || 'unknown',
                nickName: loginInfo.identifierNick || 'unknown',
                avatar: loginInfo.selSessHeadUrl || '',
                type: '',
            },
        };
        return selfMsg;
    }
    // 自定义语音消息
    function selfMsgVoice (ext, data, time, random, status) {
        let selfMsg = {
            infoType: ext,
            complete: status,
            msgInfo: {
                mediaId: data.mediaId,
                type: data.type,
                dataLid: data.localId,
                second: data.second,
                tempId: data.tempId,
            },
            time: time,
            random: random,
            userInfo: {
                studentId: loginInfo.identifier || 'unknown',
                nickName: loginInfo.identifierNick || 'unknown',
                avatar: loginInfo.selSessHeadUrl || '',
                type: '',
            },
        };
        return selfMsg;
    }
    // webim实例化msg
    function setMsg () {
        if (!selSess) {
            selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var isSend = true;// 是否为自己发送
        var seq = -1;// 消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296);// 消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000);// 消息时间戳
        let subType = webimPublic.subType();// 消息子类型
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
        return msg;
    }

    /**
     * // 虚拟发送消息
     * @param {*} curGroupId //当前消息群
     * @param {*} liveId //当前课程互动区id
     * @param {*} status //上传状态
     */
    function msgChangeStatus (curGroupId, liveId, statu, msg) {
        if (curGroupId === liveId) {
            status === 'uploading' && store.dispatch(addMsg(msg)) || store.dispatch(repMsg(msg));
        } else {
            status === 'uploading' && store.dispatch(addMsgDis(msg)) || store.dispatch(repMsgDis(msg));
        }
    }
    // 自定义消息综合
    function selfAllMsg (ext, body, time, random, status) {
        let obj;
        switch (ext) {
            case 'image':
                obj = selfMsgImg(ext, body, time, random, status);
                break;
            case 'text':
                obj = selfMsgTxt(ext, body, time, random, status);
                break;
            case 'wxvoice':
                obj = selfMsgVoice(ext, body, time, random, status);
        }
        status === 'uploading' && store.dispatch(addMsg(obj)) || store.dispatch(repMsg(obj));
    }
    // 发送前消息json格式
    function msgJSbef (type, one, two, three, four) {
        let sendBefMsg = {
            one: one,
            two: two,
            three: three,
            four: four,
            type: type,
        };
        let msgJS = JSON.stringify(sendBefMsg);
        sessionStorage.setItem('sendMsg', msgJS);
    }
    // 解析文字表情消息
    function expTxtMsg (msg, msgtosend) {
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgtosend.match(expr);
        var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
            if (tmsg) {
                text_obj = new webim.Msg.Elem.Text(tmsg);
                msg.addText(text_obj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];
            if (emotion) {
                face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(face_obj);
            } else {
                text_obj = new webim.Msg.Elem.Custom(emotions[i]);
                msg.addCustom(text_obj);
            }
            restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
            msgtosend = msgtosend.substring(restMsgIndex);
        }
        if (msgtosend) {
            text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addCustom(text_obj);
        }
        return msg;
    }
    return {repeatSend, sendTxtMsg, sendVoiceMsg, sendImageMsg};
})();
