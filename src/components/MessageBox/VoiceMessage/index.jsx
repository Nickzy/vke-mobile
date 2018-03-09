import React, { Component } from 'react';
import { Badge } from 'antd-mobile';
import PropTypes from 'prop-types';
import AudioPlayer from '../../AudioPlayer';

import './style.less';

/**
 * 录音消息组件
 * @property {callback} HandleonClickRecordIcon 点击更改播放icon状态
 * @memberof VoiceMessage
 */
class VoiceMessage extends Component {

    /**
     * Creates an instance of VoiceMessage.
     * @param {any} props 组件props
     * @memberof VoiceMessage
     */
    constructor (props) {
        super(props);
        this.state = {
            redDot: true, // 小红点状态
            playRecord: false, // 消息未读状态
            duration: this.props.duration,
            src: this.props.src,
        };
    }

    render () {
        const recordTime = this.props.duration;// 传入待渲染的时间
        const setRecordWidth = 120;// css中设置的录音最长长度
        const recordWidth = recordTime / 60 * setRecordWidth;// 计算出要显示的录音长度

        return (
            <div className="message-record">
                <div className="recordWidth" style={{width: recordWidth + 10}}>
                    <AudioPlayer src={this.state.src} duration={this.state.duration}/>
                </div>
            </div>
        );
    }
}
VoiceMessage.propTypes = {
    duration: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
};
export default VoiceMessage;
