import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Badge} from 'antd-mobile';
import './style.less';

const PlayButton = (props) => (
    <div {...props} className="play_botton"><i className="icon iconfont icon-play"></i>
        <Badge dot style={{display: props.played ? 'none' : 'block'}}>
            <div className="playBadge"></div>
        </Badge>
    </div>
);

const PauseButton = (props) => (
    <div {...props} className="play_botton"><i className="icon iconfont icon-pause"></i></div>
);

const LoadingButton = (props) => (
    <div {...props} className="play_botton"><i className="icon iconfont icon-loading icon_rotate"></i></div>
);

class Controls extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        // console.log('消息播放状态' + this.props.played);

        let PlayPauseButton;
        if (this.props.loading) {
            PlayPauseButton = LoadingButton;
        } else {
            PlayPauseButton = this.props.playing ? PauseButton : PlayButton;
        }

        return (
            <PlayPauseButton onClick={this.props.togglePlayPause} />
        );
    }
}

Controls.propTypes = {
    loading: PropTypes.bool,
    played: PropTypes.bool,
    playing: PropTypes.bool.isRequired,
    togglePlayPause: PropTypes.func.isRequired,
};

export default Controls;
