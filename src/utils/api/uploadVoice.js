import {sendMsg} from '../webim/sendMessage';
import wx from 'weixin-js-sdk';
function uploadVoice (localId, second, tempId) {
    wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            console.log('语音上传中');
            var serverId = res.serverId; // 返回音频的服务器端ID
            console.log('微信返回的serverId', serverId);
            sendMsg.sendVoiceMsg(serverId, localId, second, tempId);
        },
        fail: function (res) {
            console.log('语音上传失败');
        },
        complete: function (res) {
            console.log('语音上传完成');
        },
    });
}

export {
    uploadVoice,
};


