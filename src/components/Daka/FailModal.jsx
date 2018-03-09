import React, { Component } from 'react';
import { Modal,WhiteSpace,Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import './style.less';

class FailModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            failAnswer: true,//答题失败弹框
        };
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            const { close} = this.state.failAnswer;
            this.props.handleClose({close});
        }
    }
    render () {
        console.log('答题失败')
        return (
            <Modal
                visible={this.state.failAnswer}
                transparent
                maskClosable={true}
                onClose={this.onClose('failAnswer')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
            <div className="modalWrap">
                <Icon type={'cross'}  onClick={this.onClose('failAnswer')}  className="closeModal"/>
                <h3>知识猫，口袋里的全球英语课堂</h3>
                <img className="course_qrcode_img" src="http://resource.zhishimao.cn/images/course-qrcode.jpg"/><WhiteSpace/>
                <p className="text_black text_receive">长按二维码关注，关注知识猫的公众号，明天继续答题，领取外教课～</p>
                <div className="text_base">活动规则，坚持每日答题</div>
            </div>
            </Modal>
        );
    }  
}

export default FailModal;
