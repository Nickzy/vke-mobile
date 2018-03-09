import {sdkLogin} from '../assets/webim/login/login';
import {webim} from '../utils/webim';
// import {jsonpCallback} from '../assets/webim';
export default class Live {
    constructor (props) {
        this.props = props;
        // 帐号模式，0-表示独立模式，1-表示托管模式
        this.accountMode = 0;
        // 官方 demo appid,需要开发者自己修改（托管模式）
        this.sdkAppID = null;
        this.accountType = null;
        this.selType = webim.SESSION_TYPE.GROUP;
        this.selToID = null;// 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
        this.selSess = null;// 当前聊天会话
        this.loginInfo = null;
        // 监听连接状态回调变化事件
        this.onConnNotify = function (resp) {
            switch (resp.ErrorCode) {
                case webim.CONNECTION_STATUS.ON:
                    // webim.Log.warn('连接状态正常...');
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
        };
        // 监听事件
        this.listeners = {
            'onConnNotify': this.onConnNotify, // 监听连接状态回调变化事件，必填
            'jsonpCallback': jsonpCallback, // IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
            'onBigGroupMsgNotify': onBigGroupMsgNotify, // 监听新消息(大群)事件，必填
            'onMsgNotify': onMsgNotify, // 监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
            // "onGroupSystemNotifys": vliveBase.onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
            // "onGroupInfoChangeNotify": vliveBase.onGroupInfoChangeNotify//监听群资料变化事件，选填
            'onKickedEventCall': onKickedEventCall, // 被其他登录实例踢下线
        };
        this.isAccessFormalEnv = true;// 是否访问正式环境
        if (webim.Tool.getQueryString('isAccessFormalEnv') == 'false') {
            this.isAccessFormalEnv = false;// 访问测试环境
        }
        this.isLogOn = true;// 是否在浏览器控制台打印sdk日志
        this.currentMsgSeq = 1;// 当前消息序列id
        this.options = {// 其他对象，选填
            'isAccessFormalEnv': this.isAccessFormalEnv, // 是否访问正式环境，默认访问正式，选填
            'isLogOn': this.isLogOn, // 是否开启控制台打印日志,默认开启，选填
        };
        this.curPlayAudio = null;// 当前正在播放的audio对象
        this.curPlayVoice = null; // 当前正在播放的微信语音
        webim.Log.setOn(false);
        this.liveId = props.courseInfo.vliveId;
        this.courseId = props.courseInfo.idStr;
        this.userId = props.courseInfo.lecturer.user.idStr;

        this.init();
    }
    init () {
        this.initStudent(); // 获取学员列表
        this.initLive();
        // this.initImgUpload();
    }
    initStudent () {
        request('/client/api/live/' + this.props.courseInfo.vliveId + '/student', (res) => {
            if (res.success) {
                var studentList = res.data.content;
                var slMap = {};
                if (studentList.length) {
                    for (var i = 0; i < studentList.length; i++) {
                        slMap[studentList[i].studentId] = studentList[i];
                    }
                } else {
                    console.log('学生列表为空');
                }
                this.studentList = slMap;
            }
        }, {
            courseId: this.courseId,
        });
    }
    initLive () {
        console.log(';;;;;;;;initLive');
        sdkLogin(this.props.imSign, this.listeners, this.options);
    }
}
