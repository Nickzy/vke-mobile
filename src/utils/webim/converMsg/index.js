import {webim} from '../../../utils/webim';
import ajax from '../../../utils/ajax';
import {imgUrl, apiUrl} from '../../../config/urls';
// 把消息转换成Html
function convertMsgtoHtml (msg) {
    var html = '', elems, elem, type, content, fromAccount, isExpire, isSelfSend, uinfo;
    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    let data = new Date();
    let hisDate = new Date(msg.getTime() * 1000);
    let hisTime = hisDate.getUTCFullYear() + hisDate.getMonth() + hisDate.getDate();
    let time = data.getUTCFullYear() + data.getMonth() + data.getDate();
    isExpire = time - hisTime > 3 && true || null;
    isSelfSend = msg.getIsSend();// 消息是否成功发送
    elems = msg.getElems();// 获取消息包含的元素数组
    for (var i in elems) {
        var contentObj, typeClass, $item;
        // var originIdentity = convertUserInfo(fromAccount);
        elem = elems[i];
        type = elem.getType();// 获取元素类型
        content = elem.getContent();// 获取元素对象
        var random = msg.getRandom();
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                uinfo = convertAvatarHtml(fromAccount, random);
                contentObj = convertTextMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                uinfo = convertAvatarHtml(fromAccount, random);
                contentObj = convertCustomMsgToHtml(content, isExpire, fromAccount);
                break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                uinfo = convertAvatarHtml(fromAccount, random);
                contentObj = convertGroupTipMsgToHtml(content);
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
        // uinfo = convertAvatarHtml(fromAccount, random);
        // contentObj = convertCustomMsgToHtml(content, isExpire, fromAccount);

        if (!contentObj) {
            continue;
        }
    }
    var obj = {
        msgInfo: contentObj,
        userInfo: uinfo, // 用户信息
        random: random, // 随机数
        seq: msg.seq, // 1,2,3,4,
        time: msg.getTime(),
        infoType: content.ext, // text / wxvoice / image / redPacket
        type: content.desc, // live / discuss
        isExpire: content.ext == 'wxvoice' ? isExpire : null,
        complete: 'success',
    };
    return obj;
}
var studentList;
let url = `${apiUrl}/client/api/live/5a165844562af81df4049eda/student?courseId=5a165802562af81d55829631`;
// let data = {courseId: '5a165802562af81d55829631'};
ajax.request('post', url).then((res) => {
    if (res.success) {
        var StudentList = res.data.content;
        console.log(StudentList.length);
        var slMap = {};
        if (StudentList.length) {
            for (var i = 0; i < StudentList.length; i++) {
                slMap[StudentList[i].studentId] = StudentList[i];
            }
        } else {
            console.log('学生列表为空');
        }
        studentList = slMap;
    }
    console.log('学生列表', studentList);
});
function convertAvatarHtml (uid, msgSeq) {
    var uinfo;
    if (!uid || uid.indexOf('@TIM#') >= 0) {
        return '';
    }
    if (studentList) {
        if (studentList[uid]) {
            uinfo = studentList[uid];
        } else {
            // getStudentList((res) => {
            //     uinfo = res[uid];
            // });
        }
    }
    return uinfo;

    /* return tpl;*/
}
// 解析文本消息元素
function convertTextMsgToHtml (content) {
    console.log('解析文本消息', content.getText());
    return {
        html: deUnicode(content.getText()),
        itemStyle: 'bubble',
        itemClass: 'txt',
    };
}
// 解析自定义消息元素
function convertCustomMsgToHtml (content, isExpire, fromAccount) {
    var data = content.getData();
    var desc = content.getDesc();
    var ext = content.getExt();
    var flagDis = '';
    var _data = JSON.parse(data);
    if (ext == 'wxvoice') {
        return {
            mediaId: _data.mediaId,
            dataLid: _data.localId,
            second: _data.second,
            tempId: _data.tempId,
            classes: 'voice',
        };
    } else if (ext == 'text') {
        return {
            textContent: deUnicode(_data.text),
            classes: 'txt',
        };
    } else if (ext == 'image') {
        return {
            mediaId: imgUrl + '/' + _data.mediaId,
            classes: 'img',
        };
    }/* else if (ext == 'towall') {
     var _chtml = '<p><span>' + deUnicode(_data.uname) + ':</span><span class="replay">' + deUnicode(_data.content) + '</span></p>';
     var _remarkHtml = '';
     if (_data.remark) {
     _remarkHtml = '<p><span>回复:</span><span class="replay">' + deUnicode(_data.remark) + '</span></p>';
     }
     return {
     html: _chtml + _remarkHtml,
     itemStyle: 'bubble',
     itemClass: 'txt',
     isVoice: false,
     isSys: false
     };
     } */ else if (ext == 'msgRedpacket') {
        var toUInfo;
        var fromUInfo;
        if (studentList) {
            if (studentList[_data.toUid] && studentList[_data.fromUid]) {
                toUInfo = studentList[_data.toUid];
                fromUInfo = studentList[_data.fromUid];
            } else {
                // getStudentList(function (res) {
                //     toUInfo = res[_data.toUid];
                //     fromUInfo = res[_data.fromUid];
                // });
            }
        }
        return {
            fromName: fromUInfo.nickName,
            toName: toUInfo.nickName,
            money: _data.money,
            classes: 'rp',
        };

    } else if (ext == 'sys:banned') {
        onBannedMsg(_data);
    } else {
        return 0;
    }
}

/* unicode转汉字*/
function deUnicode (str) {
    return unescape(str.replace(/\\u/g, '%u'));
}

export {
    convertMsgtoHtml,
};
