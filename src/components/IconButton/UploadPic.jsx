import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.less';

/**
 * 上传图片组件
 * @property {callback} handleUpload 处理上传的回调
 */

class UploadPic extends Component {

    constructor (props) {
        super(props);
    }
    upload (e, cb) {
        const files = e.target.files[0];
        console.log('要上传图片消息');
        if (this.props.onSendPicture) {
            this.props.onSendPicture({files});
        }
    }
    render () {
        const {
            className,
            clickupload,
            iconStyle,
            handleUpload,
        } = this.props;

        const avatarStyle = {
            position: clickupload && 'relative',
        };

        return (
            <div className="menu-item" style = {avatarStyle}>
                <i className={className} style={iconStyle} onClick = {(e) => clickupload && clickupload(e)}></i>
                {
                    clickupload &&
                <div className = 'Avatar-upload'>
                    <input type = 'file' className= 'Avatar-input' onChange = {(e) => this.upload(e, handleUpload)}/>
                </div>
                }
            </div>
        );
    }
}
UploadPic.propTypes = {
    onSendPicture: PropTypes.func,
    className: PropTypes.string,
    clickupload: PropTypes.string,
    iconStyle: PropTypes.object,
    handleUpload: PropTypes.bool,
};

export default UploadPic;
