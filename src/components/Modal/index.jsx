import React, { Component } from 'react';
import { Modal,WhiteSpace,Icon } from 'antd-mobile';
import PropTypes from 'prop-types';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class ModalPopup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal1: true,//进入直播间时课程信息弹框 
        };
    }
    onClose = key => () => {
        this.setState({ [key]: false});
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('ModalPopup') : zhCN('ModalPopup');
        // console.log('课程详情');
        return (
            <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={true}
                onClose={this.onClose('modal1')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
            <div className="modalWrap">
                <Icon type={'cross'}  onClick={this.onClose('modal1')}  className="closeModal"/>
                <h3>{lang.title}</h3>
                <img className="course_qrcode_img" src="/images/course-qrcode.jpg"/><WhiteSpace/>
                <div className="text">{lang.cue}</div><WhiteSpace/>
                <div className="time"> <em>{lang.status}</em></div>
            </div>
            </Modal>
        );
    }  
}

ModalPopup.propTypes = {
    type: PropTypes.string,
};

ModalPopup.defaultProps = {
    type: 'publicClass',
};

export default ModalPopup;
