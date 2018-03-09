// 模拟微信的方法，完成在非微信环境中的测试
const wx = {
    startRecord: (callbacks) => {
        console.warn('wx.startRecord：开始录音');
        if (typeof (callbacks) === 'undefined') {
            return;
        }
        if (typeof (callbacks.success) !== 'undefined') {
            callbacks.success();
        }
        if (typeof (callbacks.cancel) !== 'undefined') {
            // callbacks.cancel();
        }
    },
    stopRecord: (callbacks) => {
        console.warn('wx.stopRecord：停止录音');
        if (typeof (callbacks) === 'undefined') {
            return;
        }
        if (typeof (callbacks.success) !== 'undefined') {
            callbacks.success({
                localId: new Date().getTime(),
            });
        }
    },
    onVoiceRecordEnd: (callbacks) => {
        console.warn('wx.onVoiceRecordEnd：自动停止录音');
        if (typeof (callbacks) === 'undefined') {
            return;
        }
        if (typeof (callbacks.complete) !== 'undefined') {
            callbacks.complete({
                localId: new Date().getTime(),
            });
        }
    },
};

export default wx;
