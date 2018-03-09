import React, { Component } from 'react';
import { Badge} from 'antd-mobile';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import IconButton from '../IconButton';
import ImageMessage from './ImageMessage';
import TextMessage from './TextMessage';
import VoiceMessage from './VoiceMessage';

import {setMsg} from '../../utils/webim/sendMessage';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

/**
 * 每条消息盒子组件
 * @property {callback} handleOnClickDeleteButton 点击删除消息事件
 * @memberof MessageBox
 */

class MessageBox extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showStatus: true,
            myid: '59e59330562af80df36612f5', // 假设我的ID值，只有本人有撤回功能
        };
        this.handleOnClickDeleteButton = this.handleOnClickDeleteButton.bind(this);
        this.handleOnClickRepeatButton = this.handleOnClickRepeatButton.bind(this);
    }
    handleOnClickDeleteButton () {
        this.setState({ showStatus: false });
    }
    handleOnClickRepeatButton () {
        console.log('重新发送');
        setMsg.repeatSend();
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('MessageBox') : zhCN('MessageBox');

        /**
        * @设置avatar 的参数（默认宽高相等）
        * @width 为头像宽
        * @radius 为头像形状
        */

        var studentMessageClass = 'Message-list-item Message-of-student';
        var lecturerMessageClass = 'Message-list-item ';
        const message = this.props.Messages;
        const lecturerTagStyle = {
            marginLeft: 10,
            padding: '0 3px',
            background: 'none',
            borderRadius: 2,
            color: '#25D8EF',
            border: '1px solid #25D8EF',
        };
        function msgSendStatus (sendStatus) {
            switch (sendStatus) {
                case 'success':
                    return `${lang.chehui}`;
                case 'uploading':
                    return `${lang.fasongzhong}`;
                case 'fail':
                    return `${lang.chongfa}`;
            }
        }
        return (
            <div className={message.identity === 'lecturer' ? lecturerMessageClass : studentMessageClass}
                style={{display: this.state.showStatus || 'none'}}>
                <div className="Message-container">
                    <div className="Message-from-avatar">
                        <Avatar src={message.avatar} modalInfo={message.identity === 'lecturer' && true} isEnglish={isEnglish}/>
                        <div style={{display: message.identity === 'lecturer' ? 'block' : 'none' }}>
                            <IconButton fn={true} iconName={'admire-icon'} text={lang.shang} idType='admire' isEnglish={isEnglish}/>
                        </div>
                    </div>
                    <div className="Message-box">
                        <div className="Message-with-text">
                            <div className="Message-left">
                                <div className="Message-from-name littleReguGrey">{message.from}</div>
                                <div style={{display: message.identity === 'lecturer' || 'none'}}>
                                    <Badge text={lang.jiangshi} style={lecturerTagStyle}/>
                                </div>
                            </div>
                        </div>
                        <div className="Message-content">
                            <div className="MessageShow">
                                {
                                    message.type === 'text' ? <TextMessage text={message.text}/>
                                        : message.type === 'image' ? <ImageMessage src={message.src}/>
                                            : message.type === 'wxvoice' ? <VoiceMessage duration={parseInt(message.duration)} src={message.src} isEnglish={isEnglish}/> : null
                                }
                                <div className="Message-delete littleReguGrey"
                                    onClick={ message.sendStatus === 'success' ? this.handleOnClickDeleteButton
                                        : message.sendStatus === 'fail' ? this.handleOnClickRepeatButton : null}
                                    style={{display: message.id === this.state.myid ? 'block' : 'none' }}>
                                    <span>
                                        <i className="icon iconfont icon-fail iconalert" style={{display: message.sendStatus === 'fail' ? 'inline' : 'none'}}></i>
                                        {msgSendStatus(message.sendStatus)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MessageBox.propTypes = {
    Messages: PropTypes.object.isRequired,
};

export default MessageBox;
