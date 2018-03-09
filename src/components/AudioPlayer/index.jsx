import React from 'react';
import PropTypes from 'prop-types';
import Audio from './Audio';
import Player from './Player';

// 播放器需求
// 1、播放音频
// 2、一个网页只允许播放一条音频
// 3、播放完后，顺序播放

/**
 * AudioPlayer
 *
 * @description 开始不加载音频文件、只有点击之后才加载
 * @class AudioPlayer
 * @extends {React.Component}
 */
class AudioPlayer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            waiting: true,
        };
        this.togglePlayPause = this.togglePlayPause.bind(this);
    }

    togglePlayPause () {
        this.state.loading || this.setState({
            waiting: false,
        });
    }
    render () {

        const newProps = {
            controlStates: {
                loading: false,
                playing: false,
                played: false,
            },
            controlCallbacks: {
                togglePlayPause: this.togglePlayPause,
            },
            timelineStates: {
                loading: true,
                progress: 0,
                duration: this.props.duration,
            },
            timelineCallbacks: {
                setProgress: null,
            },
        };
        if (this.state.waiting) {
            return <Player {...newProps} />;
        }
        return <Audio {...this.props}/>;
    }
}

AudioPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
};

export default AudioPlayer;


