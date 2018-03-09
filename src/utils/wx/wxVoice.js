import wx from 'weixin-js-sdk';
import {uploadVoice} from '../../api/uploadVoice';
// import {webin_wx} from '../webIm/webim_wx';
export const useWx = (() => {
    let currVoiceLocalId = null; // 当前语音的本地ID
    let curPlayAudio; // 当前播放的audio
    let curPlayVoice; // 当前播放的微信语音
    let localId; // 录音结束的本地ID
    let recordingStatus = 'default';
    // 开始录音
    function startRecord () {
        wx.startRecord();
    }
    function getRecordingStatus (type) {
        recordingStatus = type;
    }
    // 录音结束上传录音
    function stopVoice (seconds, tempId) {
        wx.stopRecord({
            success: function (res) {
                localId = res.localId;
                uploadVoice(localId, seconds, tempId);
            },
            fail: function (res) {
                console.log(res);
            },
        });
    }
    // 取消录音
    function cancelRecord (type) {
        type = type || '';
        if (type == 'cancel') {
            wx.stopRecord({
                localId: null,
            });
        } else {
            wx.stopRecord({
                localId: localId, // 需要停止的音频的本地ID，由stopRecord接口获得
            });
        }

    }
    // preplay录音
    function prePlayRecord () {
        wx.playVoice({
            localId: localId, // 需要播放的音频的本地ID，由stopRecord接口获得
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            },
        });
    }
    function stopRecordVoice (type) {
        wx.stopRecord({
            success: function (res) {
                if (type === 'record') {
                    localId = res.localId;
                } else {
                    console.log(res);
                }
            },
            fail: function (res) {
                console.log(res);
            },
        });
    }

    /**
     * 播放微信语音
     * @param {*} e
     */
    function onWxVoicePlay (e) {
        curPlayVoice && 
    }
    return {
        getWxVoiceId: getWxVoiceId, // 获取voiceId
        wxVoiceStop: wxVoiceStop, // 停止播放语音
        voiceStop: voiceStop, // 停止播放语音
        wxVoicePlay: wxVoicePlay, // 播放语音
        onWxVoicePlay: onWxVoicePlay,
        wxVoicePlayEnd: wxVoicePlayEnd, // 语音播放停止
        wxVoiceDownload: wxVoiceDownload, // 下载语音
        startRecord: startRecord, // 开始录音
        stopVoice: stopVoice, // 停止录音(语音)并上传
        stopRecordVoice: stopRecordVoice, // 停止录音(录音／语音)
        prePlayRecord: prePlayRecord, // 预播放
        cancelRecord: cancelRecord, // 取消录音
        getRecordingStatus: getRecordingStatus, // 判断当前是否为录音状态
    };
})();
