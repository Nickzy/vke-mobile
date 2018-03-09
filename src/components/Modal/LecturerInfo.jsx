import React, { Component } from 'react';
import {  Modal,WhiteSpace,Icon } from 'antd-mobile';
import PropTypes from 'prop-types';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class LecturerInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            lecturerInfo: true,
            lecturerAvatarSrc: "/images/invite.png",
            lecturerName:"Andy",
            lecturerTag:"产品经理",
        }
    }
    onClose = key => () => {
        this.setState({[key]: false});
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('LecturerInfo') : zhCN('LecturerInfo');

        return (
            <Modal
            visible={this.state.lecturerInfo}
            transparent
            maskClosable={true}
            onClose={this.onClose('lecturerInfo')}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
            <div className="modalWrap">
                <Icon type={'cross'}  onClick={this.onClose('lecturerInfo')}  className="closeModal"/><WhiteSpace size="lg"/>
                <img src={this.state.lecturerAvatarSrc} className="modal_avatar"/><WhiteSpace size="sm"/>
                <p className="info_title">{this.state.lecturerName}</p><WhiteSpace size="xs"/>
                <p className="info_text">{this.state.lecturerTag}</p><WhiteSpace size="sm"/>
                <div className="enter_button">{lang.jiangshizhuye}</div>
            </div>
        </Modal>
        );
    }  
}

export default LecturerInfo;
