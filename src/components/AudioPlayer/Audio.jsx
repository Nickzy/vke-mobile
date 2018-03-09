import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

/**
 * Audio为Player的高阶组件（HOC）
 * @param {React.Component} Player 组件
 */
const Audio = (Player) => class AudioComponent extends React.PureComponent {
    constructor (props) {

        super(props);

        // 检查属性
        if (!props.src || !props.duration) {
            throw new Error('音频消息缺少src或音频消息缺少duration');
        }

        // 默认状态
        this.state = {
            playing: false, // true/false是否播放
            loading: true, // true/false是否加载完成
            played: false, // true/false是否播放过
            progress: 0, // 播放进度
            duration: this.props.duration || 0, // 音频总时长
            volume: 1, // 音量
        };

        // 绑定方法
        this.loadSrc = this.loadSrc.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);

        // 与音频数据加载的方法
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onSuspend = this.onSuspend.bind(this);
        this.onAbort = this.onAbort.bind(this);
        this.onError = this.onError.bind(this);
        this.onStalled = this.onStalled.bind(this);
        this.onCanPlayThrough = this.onCanPlayThrough.bind(this);

        // 与音频文件播放相关的方法
        this.onCanPlay = this.onCanPlay.bind(this); // 是否可以播放
        this.onEnded = this.onEnded.bind(this); // 播放结束
        this.onPlay = this.onPlay.bind(this); // 播放
        this.onPause = this.onPause.bind(this); // 暂停
        this.setVolume = this.setVolume.bind(this); // 设置音量
        this.setProgress = this.setProgress.bind(this); // 设置播放进度
    }


    onLoadStart () {
        console.log('audio loadstart:开始请求数据...');
    }

    onProgress () {
        console.log('audio progress:正在请求数据...');
    }

    onSuspend () {
        console.log('audio suspend:延迟加载...');
    }
    onAbort () {
        console.log('audio abort:主动终止下载，不引发error...');
    }
    onError () {
        console.log('audio error:请求数据遇到错误...');
    }
    onStalled () {
        console.log('audio stalled:网速太慢了...');
    }

    // 这里检测音频数据是否加载完成
    onCanPlayThrough () {
        console.log('audio canplaythrough:音频加载全部完毕...');
        this.setState({
            loading: false,
        });
    }

    onCanPlay () {
        console.log('audio canplay:可以播放，但中途可能因为加载而暂停...');
        let duration = this.audioElement.duration;
        if (duration !== this.state.duration) {
            console.log('加载的音频总时长与真实的时长不相符');
            this.setState({
                duration: duration,
            });
        }
    }
    onPlay () {
        console.log('audio play:正在播放...');
        this.setState({ playing: true, played: true});

        // 使用循环计时器来检测当前音频已播放的长度
        // 为什么是900ms而不是1000ms？
        // 因为900ms总能够拿到当前的时间，距离上一次间隔小于1，为了解决数据跳跃显示的问题
        // 但不是最优解，但目前可以解决需求
        // 改进算法变成1000ms，配合floor完成时间的显示（那为什么不用round或者ceil呢）
        console.log('创建播放计时器...');
        this.intervalId = setInterval(() => {
            this.setState({ progress: this.audioElement.currentTime });
        }, 1000);
    }
    onPause () {
        console.log('audio pause:暂停播放...');
        this.setState({ playing: false });
        this._clearInterval();
    }
    onEnded () {
        console.log('audio ended:播放结束...');
        this.setState({ progress: 0 });
        this.audioElement.currentTime = 0;
    }
    onVolumeChange () {
        console.log('audio change:音量变化...');
    }

    setVolume (volume) {
        console.log(`音量设置为 ${volume}`);
        this.audioElement.volume = volume;
        this.setState({ volume });
    }

    setProgress (newProgress) {
        let progress = newProgress;
        if (progress > this.state.duration) {
            progress = this.state.duration;
        } else if (progress <= 0) {
            progress = 0;
        }
        this.audioElement.currentTime = progress;
        this.setState({ progress });
        console.log(`播放进度设置为：${progress}`);
    }

    _clearInterval () {
        console.log('清除播放计时器...');
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    loadSrc () {
        console.log('加载音频src');
        this.audioElement.src = this.props.src;
        this.audioElement.load();
        this.togglePlayPause();
        this.setState({ progress: 0 });
        this._clearInterval();
    }

    togglePlayPause () {
        console.log(`当前播放状态${this.state.playing}，切换中...`);
        if (this.state.playing) {
            this.audioElement.pause();
        } else {
            this.audioElement.play();
        }
    }

    render () {
        const newProps = Object.assign({}, {
            controlStates: {
                loading: this.state.loading,
                playing: this.state.playing,
                played: this.state.played,
            },
            controlCallbacks: {
                togglePlayPause: this.togglePlayPause,
            },
            timelineStates: {
                loading: this.state.loading,
                progress: this.state.progress,
                duration: this.state.duration,
            },
            timelineCallbacks: {
                setProgress: this.setProgress,
            },
        }, this.props);
        return (<Player {...newProps}/>);
    }

    componentDidMount () {
        console.log('组件加载完成：audio mounted!');
        this.audioElement = document.createElement('audio');

        this.audioElement.addEventListener('loadstart', this.onLoadStart);
        this.audioElement.addEventListener('progress', this.onProgress);
        this.audioElement.addEventListener('suspend', this.onSuspend);
        this.audioElement.addEventListener('abort', this.onAbort);
        this.audioElement.addEventListener('stalled', this.onStalled);
        this.audioElement.addEventListener('canplaythrough', this.onCanPlayThrough);

        this.audioElement.addEventListener('error', this.onError);
        this.audioElement.addEventListener('canplay', this.onCanPlay);
        this.audioElement.addEventListener('ended', this.onEnded);
        this.audioElement.addEventListener('play', this.onPlay);
        this.audioElement.addEventListener('pause', this.onPause);
        this.audioElement.addEventListener('volumechange', this.onVolumeChange);

        this.loadSrc();
    }

    componentWillUnmount () {
        this._clearInterval();

        this.audioElement.removeEventListener('loadstart', this.onLoadStart);
        this.audioElement.removeEventListener('progress', this.onProgress);
        this.audioElement.removeEventListener('suspend', this.onSuspend);
        this.audioElement.removeEventListener('abort', this.onAbort);
        this.audioElement.removeEventListener('stalled', this.onStalled);
        this.audioElement.removeEventListener('canplaythrough', this.onCanPlayThrough);

        this.audioElement.removeEventListener('error', this.onError);
        this.audioElement.removeEventListener('canplay', this.onCanPlay);
        this.audioElement.removeEventListener('ended', this.onEnded);
        this.audioElement.removeEventListener('play', this.onPlay);
        this.audioElement.removeEventListener('pause', this.onPause);
        this.audioElement.removeEventListener('volumechange', this.onVolumeChange);

        this.audioElement.pause();
        this.audioElement = null;
    }
};

Audio.propTypes = {
    src: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
};

export default Audio(Player);
