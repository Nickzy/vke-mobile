import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BottomGrid from './BottomGrid';
import TextareaItem from './TextareaItem';
import UploadPic from '../IconButton/UploadPic';
import AudioPlayer from '../AudioPlayer';
import AudioRecorder from '../AudioRecorder';
import {sendMsg} from '../../utils/webim/sendMessage';

import {upload} from '../../utils/api/upload';
import {uploadVoice} from '../../utils/api/uploadVoice';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

/**
 * 底部操作栏组件
 * @memberof BottomMenu
 */

const recorderCallback = (localId, time) => {
    alert(`LocalId:${localId},Time:${time}`);
    uploadVoice(localId, time, 'tempId');
};
const unauthCallback = () => {
    alert('授权失败');
};

class BottomMenu extends Component {

    constructor (props) {
        super(props);
        this.state = {
            keyboardStatus: true, // 默认发送消息方式为语音
            bottomGird: false, // 底部菜单显示更多
            hasTextMessage: false, // 输入框无文字事“发送”按钮不显示
            textareaValue: '', // 输入框中内容
            courseOver: false, // 课程已经结束
        };
        this.handleOnClickBottomMenu = this.handleOnClickBottomMenu.bind(this);
        this.onChangeTextMessage = this.onChangeTextMessage.bind(this);
        this.handleOnSendPicture = this.handleOnSendPicture.bind(this);
        this.handleOnClickMenuAdd = this.handleOnClickMenuAdd.bind(this);
        this.handleOnClickSendMessages = this.handleOnClickSendMessages.bind(this);
        this.handleOnClickMenuAdd = this.handleOnClickMenuAdd.bind(this);
    }

    // 切换底部菜单状态的事件函数
    handleOnClickBottomMenu () {
        this.setState({
            keyboardStatus: !this.state.keyboardStatus,
            bottomGird: false,
            hasTextMessage: false,
        });
    }

    // 切换底部‘宫格菜单’状态的事件函数
    handleOnClickMenuAdd () {
        const bottomStatus = !this.state.bottomGird;
        if (this.props.handleAdd) {
            this.props.handleAdd({bottomStatus});
        }
        this.setState({ bottomGird: !this.state.bottomGird });
    }

    // 判断输入框中是否有文字输入=>显示或隐藏‘发送’按钮
    onChangeTextMessage (change) {
        if (change.hasTextMessage) {
            this.setState({
                hasTextMessage: true,
                textareaValue: change.textareaValue,
            });
        } else {
            this.setState({ hasTextMessage: false });
        }
    }
    // 发送图片消息
    handleOnSendPicture (picture) {
        upload(picture.files);
    }

    // 发送文字消息
    handleOnClickSendMessages () {
        const value = this.state.textareaValue;
        console.log('拿到互动区数据', value);
        sendMsg.sendTxtMsg(value, 'live');
        document.querySelector('.interactArea').querySelector('textarea').value = '';
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('BottomMenu') : zhCN('BottomMenu');

        let keyboardStatus = this.state.keyboardStatus;
        let iconClass = classNames({
            'icon': true,
            'iconfont': true,
            'icon-keyboard': keyboardStatus,
            'icon-voice': !keyboardStatus,
        });

        const iconPicProps = {
            className: 'icon iconfont icon-picture',
            clickupload: 'true',
            iconStyle: {
                fontSize: '30px',
                color: '#919191',
            },
        };

        // console.log('发送消息测试', this.props.messages.toArray());
        // console.log('发送消息测试dis', this.props.disMsg.toArray());
        return (
            <div className="bottom-menu">
                <div className="bottom-menu-top" style={{display: !this.state.courseOver || 'none'}}>
                    <div className="menu-item">
                        <i className={iconClass} onClick={this.handleOnClickBottomMenu}></i>
                    </div>
                    <div className="menu-item menu-item-handle" style={{display: keyboardStatus || 'none'}}>
                        <AudioRecorder duration={59} unauthCallback={unauthCallback} recorderCallback={recorderCallback} isEnglish={isEnglish}/>
                    </div>
                    <div className="menu-item menu-item-handle interactArea" style={{display: !keyboardStatus || 'none'}} >
                        <TextareaItem onChangeText={this.onChangeTextMessage}/>
                    </div>
                    <UploadPic {...iconPicProps} onSendPicture={this.handleOnSendPicture}/>
                    <div className="menu-item" style={{display: !this.state.hasTextMessage || 'none'}} >
                        <i className="icon iconfont icon-more-operator" onClick={this.handleOnClickMenuAdd}></i>
                    </div>
                    <div className="menu-item" style={{display: this.state.hasTextMessage || 'none'}} >
                        <div className="sendMessage" onClick={this.handleOnClickSendMessages}>{lang.send}</div>
                    </div>
                </div>
                {/* 课程结束后显示完整录音 */}
                <div className="bottom-menu-top" style={{display: this.state.courseOver || 'none'}}>
                    <div className="menu-item menu-item-handle audioPlayback">
                        <AudioPlayer src={'/songs/liangliang.mp3'} duration={100}/>
                    </div>
                    <div className="menu-item">
                        <i className="icon iconfont icon-more-operator" onClick={this.handleOnClickMenuAdd}></i>
                    </div>
                </div>
                <div className="bottom-gird-menu" style={{height: this.state.bottomGird ? '160px' : '0'}}>
                    <BottomGrid isEnglish={isEnglish}/>
                </div>
            </div>
        );
    }
}
BottomMenu.propTypes = {
    onSubmit: PropTypes.func,
};

const mapStateToProps = (state) => ({
    messages: state.message,
    disMsg: state.disMsg,
});
export default connect(mapStateToProps)(BottomMenu);
