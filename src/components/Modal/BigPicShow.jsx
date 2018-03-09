import React, { Component } from 'react';
import { Modal,Flex } from 'antd-mobile';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.less';

class BigPicShow extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bigPicShow: true,//图片展示
        };
    }
    onClose = key => () => {
      this.setState({ [key]: false });
      if (this.props.handleClose) {
        this.props.handleClose();
      }
    }

    render () {
        const src=this.props.src;
        const type=this.props.type;
        let iconClass = classNames({
            'shareImg': type==='shareClass',//课程分享
            'imgLargenShow': type!=='shareClass',//点击查看大图
        });
        return (
            <Modal className="imgLargenShowModal"
                visible={this.state.bigPicShow}
                transparent
                maskClosable={true}
                onClose={this.onClose('bigPicShow')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
            <img src={src} className={iconClass} onClick={this.onClose('bigPicShow')}/>
            </Modal>
        );
    }  
}
BigPicShow.propTypes = {
    type: PropTypes.string,
    src:PropTypes.string,
};

BigPicShow.defaultProps = {
    src: '/images/share.svg',
};

export default BigPicShow;
