import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BottomGrid from './BottomGrid';
import TextareaItem from './TextareaItem';
import {sendMsg} from '../../utils/webim/sendMessage';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class DiscussMenu extends Component {

    constructor (props) {
        super(props);
        this.state = {
            bottomGird: false, // 底部菜单显示更多
            hasTextMessage: false, // 输入框无文字无发送按钮
            textareaValue: '', // 输入框中内容
        };
        this.onChangeTextMessage = this.onChangeTextMessage.bind(this);
        this.handleOnClickMenuAdd = this.handleOnClickMenuAdd.bind(this);
        this.handleOnClickSendMessages = this.handleOnClickSendMessages.bind(this);
    }

    // 判断输入框中是否有文字输入=>显示或隐藏‘发送’按钮
    onChangeTextMessage (change) {
        if (change.hasTextMessage) {
            this.setState({
                hasTextMessage: true,
                textareaValue: change.textareaValue,
            });
        } else {this.setState({ hasTextMessage: false });}
        // console.log('文字文字' + JSON.stringify(change));
    }

    // 切换底部‘宫格菜单’状态的事件函数
    handleOnClickMenuAdd () {
        const bottomStatus = !this.state.bottomGird;
        if (this.props.handleAdd) {
            this.props.handleAdd({bottomStatus});
        }
        this.setState({ bottomGird: !this.state.bottomGird });
    }

    // 发送文字消息
    handleOnClickSendMessages () {
        const value = this.state.textareaValue;
        console.log('拿到讨论区数据', value);
        sendMsg.sendTxtMsg(value, 'live');
        document.querySelector('.discussArea').querySelector('textarea').value = '';
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('DiscussMenu') : zhCN('DiscussMenu');

        const placeholder = lang.gohudongqu;
        return (
            <div className="bottom-menu">
                <div className="bottom-menu-top">
                    <div className="menu-item menu-item-handle discussArea">
                        <TextareaItem onChangeText={this.onChangeTextMessage} placeholder={placeholder}/>
                    </div>
                    <div className="menu-item" style={{display: !this.state.hasTextMessage || 'none'}} >
                        <i className="icon iconfont icon-more-operator" onClick={this.handleOnClickMenuAdd}></i>
                    </div>
                    <div className="menu-item" style={{display: this.state.hasTextMessage || 'none'}} >
                        <div className="sendMessage" onClick={this.handleOnClickSendMessages}>{lang.send}</div>
                    </div>
                </div>
                <div className="bottom-gird-menu" style={{height: this.state.bottomGird ? '160px' : '0'}}>
                    <BottomGrid isEnglish={isEnglish}/>
                </div>
            </div>
        );
    }
}

export default DiscussMenu;
