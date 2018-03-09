import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd-mobile';
import './style.less';

class Timeline extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            progress: props.progress || 0,
            handling: false,
        };
        this.setProgress = this.props.setProgress;
        this.onChange = this.onChange.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (!this.state.handling && nextProps.duration !== 0) {
            this.setState({
                progress: nextProps.progress,
            });
        }
    }

    onChange (e) {
        // 滚动过程中改变进度条的tracker的位置
        this.setState({
            progress: e,
            handling: true,
        });
        // this.props.setProgress(e); 为了不影响播放将其注释掉
    }

    onAfterChange (e) {
        // 滚动完成后，设置播放的进度
        this.setState({
            progress: e,
            handling: false,
        });
        this.props.setProgress(e);
    }

    render () {
        let trackStyle, railStyle, handleStyle;
        trackStyle = {
            backgroundColor: '#fff',
            height: '2px',
        };
        railStyle = {
            backgroundColor: '#00AEC4',
            height: '2px',
        };
        handleStyle = {
            borderColor: '#fff',
            height: '6px',
            width: '6px',
            marginLeft: '-3px',
            marginTop: '-2.5px',
            backgroundColor: '#fff',
        };
        return (
            <div className="timeLine">
                <Slider
                    disabled = {this.props.loading}
                    max = {this.props.duration}
                    value = {this.state.progress}
                    onChange = {this.onChange}
                    onAfterChange = {this.onAfterChange}
                    trackStyle = {trackStyle}
                    railStyle = {railStyle}
                    handleStyle = {handleStyle}
                />
            </div>
        );
    }
}

Timeline.propTypes = {
    loading: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired, // timeline总时间
    progress: PropTypes.number.isRequired, // timeline当前播放进度的时间
    setProgress: PropTypes.func,
};

export default Timeline;
