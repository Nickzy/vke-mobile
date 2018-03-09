import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

/**
 * “讨论区前三条消息显示”的组件
 * @memberof DiscussMsgPopUp
 */
class DiscussMsgPopUp extends Component {

    constructor (props) {
        super(props);
        this.state = {
            popStatus: true,
        };
        this.handleClickOnPopButton = this.handleClickOnPopButton.bind(this);
    }

    /**
    * @handleClickOnPopButton “弹”中消息的点击事件
    * @popStatus 为点击要切换状态，“true”为默认=>显示
    */
    handleClickOnPopButton () {
        this.setState({ popStatus: !this.state.popStatus });
    }
    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('DiscussMsgPopUp') : zhCN('DiscussMsgPopUp');

        let {popStatus} = this.state;

        var popMessages = null;
        if (this.props.popMessages) {
            popMessages = this.props.popMessages;
        } else {
            console.log('互动区没人说话');
        }

        return (
            <div className="pop-wrapper">
                <div className="pop-button" onClick={this.handleClickOnPopButton}>{lang.tan}</div>
                <div className="pop-content" style={{display: popStatus ? 'block' : 'none'}}>
                    {popMessages.map((item, i) => (
                        <div className="pop-message-box" key={i}>
                            <Avatar size={20} src={item.avatar} clickupload={false} isEnglish={isEnglish}/>
                            <div className="pop-message">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default DiscussMsgPopUp;
