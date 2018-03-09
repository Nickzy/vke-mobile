import React from 'react';
import PropTypes from 'prop-types';
// import wx from './wx';
import wx from 'weixin-js-sdk';

import {wxConfig} from '../../utils/api';
import HoldControls from './HoldControls';
import PressControls from './PressControls';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

class WxRecorder extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            recorderCallback: props.recorderCallback, // 录音结束的回调
            duration: props.duration,
            controlMode: 'hold', // hold/press
            isAuthRecord: false,
            recording: false, // true/false是否正在录音
            progress: -1,
            localId: null,
        };

        this.onFinsh = this.onFinsh.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.toggleStartStop = this.toggleStartStop.bind(this);
        this.changeControls = this.changeControls.bind(this);
    }

    // 清除时间定时器
    _clearInterval () {
        if (this.intervalId !== null) {
            console.log('WxRecorder 清除播放计时器...');
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // 授权微信录音
    _authRecord () {
        console.log('WxRecorder 检查微信录音授权');
        this.state.isAuthRecord || wx.startRecord({
            success: () => {
                wx.stopRecord();
                this.setState({isAuthRecord: true}); // 设置微信的授权状态为true
                console.warn('WxRecorder 微信录音授权成功');
            },
            cancel: () => {
                console.warn('WxRecorder 微信录音取消授权');
                this.props.unauthCallback(); // 授权失败，调用回调
            },
        });
    }

    // 开始录音
    _onStart () {
        if (this.state.isAuthRecord) { // 开始前先检查授权
            console.warn('WxRecorder 开始录音');
            this._clearInterval(); // 为保障定时器清除，需要每次开始前调用
            this.setState({
                recording: true,
                progress: 0,
                localId: null,
            });
            console.warn('WxRecorder 开始计时...');
            wx.startRecord();
            this.intervalId = setInterval(() => {
                // 先在这里创建计数器，如果出现bug可以考虑放到wx.startRecord()的回调里面
                if (this.state.progress < this.state.duration) {
                    this.setState({ progress: this.state.progress + 1 });
                } else {
                    this._onStop(); // // 到了时间自动结束
                    // 语音模式自动完成，录音模式有试听的需求，需手动处理
                    this.state.controlMode === 'hold' && this.onFinsh();
                }
            }, 1000);
        } else {
            this._authRecord();
        }
    }

    // 结束录音
    _onStop () {
        console.warn('WxRecorder 结束录音');
        this._clearInterval();
        wx.stopRecord({
            success: (res) => {
                console.warn('wx.stopRecord 微信录音成成功');
                this.setState({
                    recording: false,
                    localId: res.localId, // 录音成功后保存localId，用来做试听和上传功能
                });
            },
            fail: (res) => {
                console.warn('wx.stopRecord 微信录音失败');
                this.setState({
                    recording: false,
                    localId: null,
                });
            },
        });
    }

    // 开始和结束录音，只暴露给用户一个方法
    toggleStartStop () {
        this.state.recording ? this._onStop() : this._onStart();
    }

    // 完成录音
    onFinsh () {
        console.log('WxRecorder onFinsh：完成录音，处理中...' + this.state.localId, progress);
        this._clearInterval();
        let progress = this.state.progress, duration = this.state.duration,
            recorderCallback = this.state.recorderCallback;
        if (progress >= 1 && progress <= duration && this.state.localId !== null) {
            this.props.recorderCallback(this.state.localId, progress);
        }
        this.setState({ // 结束后，恢复默认状态
            recording: false,
            progress: -1,
            localId: null,
        });
    }

    // 取消录音
    onCancel () {
        console.log('WxRecorder onCancel: 完成录音，取消中...');
        this._clearInterval();
        this.setState({ // 取消后，恢复默认状态
            recording: false,
            progress: -1,
            localId: null,
        });
    }

    // 切换模式
    changeControls () {
        if (this.state.recording === false && this.state.progress === -1) {
            let controlMode = this.state.controlMode === 'hold' ? 'press' : 'hold';
            console.log(`WxRecorder changeControls：切换为${controlMode}`);
            this.setState({controlMode: controlMode});
        } else {
            console.log('WxRecorder changeControls：拒绝切换');
            // console.error('录音状态' + this.state.recording);
            // console.error('录音进度' + this.state.progress);
        }
    }
    componentWillMount () {
        const isEnglish = this.props.isEnglish;
        this.setState({
            langHold: isEnglish ? enUS('HoldControls') : zhCN('HoldControls'),
            langPress: isEnglish ? enUS('PressControls') : zhCN('PressControls'),
        });
    }

    componentDidMount () {
        wxConfig('5a166c2b562af81d55829638');// 微信授权
        this._authRecord(); // 加载组件要授权
    }

    componentWillUnmount () {
        this._clearInterval(); // 挂载组件要释放计数器
    }

    render () {
        let Controls = this.state.controlMode === 'hold' ? HoldControls : PressControls;
        let newProps = {
            controlStates: {
                recording: this.state.recording, // true/false是否正在录音
                progress: this.state.progress,
                duration: this.state.duration,
                localId: this.state.localId,
                recorderCallback: this.state.recorderCallback,
            },
            controlCallbacks: {
                toggle: this.toggleStartStop,
                finish: this.onFinsh,
                cancel: this.onCancel,
                changeControls: this.changeControls,
            },
            langHold: this.state.langHold,
            langPress: this.state.langPress,
        };
        return (
            <Controls {...newProps} />
        );
    }
}

WxRecorder.propTypes = {
    duration: PropTypes.number,
    recorderCallback: PropTypes.func, // 处理完之后的处理回调
    unauthCallback: PropTypes.func,
};

WxRecorder.defaultProps = {
    duration: 59,
    recorderCallback: function () {
        console.warn('没走上传录音函数');
    },
};

export default WxRecorder;
