import React, { Component } from 'react';
import { Modal, WhiteSpace, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';

import LecturerInfo from '../Modal/LecturerInfo';

import {imgUrl} from '../../config/urls';

import './style.less';

/**
 * 头像组件
 * @property {string} src 背景图片链接
 * @property {boolean} modalInfo 点击后显示弹框信息
 * @property {int} size 图片大小，默认40px
 * @property {int} radius 圆角大小 ，默认50%
 * @property {callback} handleUpload 处理上传的回调
 * @property {boolean} clickupload 为true时可点击头像重新上传图片
 */

class Avatar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            lecturerInfo: false,
        };
        this.clickupload = this.clickupload.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    /**
     * 上传新头像
     * @param {*} e 接收事件
     * @param {*} cb 处理上传图片后的回调
     * @returns {None} None
     */
    upload (e, cb) {
        const files = e.target.files[0];
        // 处理上传
        upload(files);
    }

    clickupload (e) {
        if (this.props.modalInfo) {
            console.log(e.target.id);// 获取讲师id
            this.setState({
                lecturerInfo: true,
                lecturerInfo: e.target.id,
            });
        }
    }
    handleCloseModal () {
        this.setState({ lecturerInfo: false });
    }

    render () {
        let { src, size, radius, clickupload, handleUpload, isEnglish} = this.props;
        size = size || 40 + 'px';
        const avatarStyle = {
            width: size,
            minWidth: size,
            height: size,
            minHeight: size,
            borderRadius: radius || '50%',
            position: clickupload && 'relative',
            overflow: 'hidden',
        };
        const url = src.indexOf('http') > -1;
        const background = {backgroundImage: url ? `url(${src})` : `url(${imgUrl}/${src})`, backgroundSize: 'cover', height: '100%', width: '100%'};
        return (
            <div className = 'Avatar-container' style = {avatarStyle}>
                <div className = 'Avatar' id="000lecturer000id" style = {background} onClick = {this.clickupload}></div>
                {
                    clickupload &&
                    <div className = 'Avatar-upload'>
                        <input type = 'file' className= 'Avatar-input' onChange = {(e) => this.upload(e, handleUpload)}/>
                    </div>
                }
                {
                    this.state.lecturerInfo && <LecturerInfo handleClose={this.handleCloseModal} isEnglish={isEnglish}/>
                }
            </div>
        );
    }
}
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    modalInfo: PropTypes.bool,
    size: PropTypes.number,
    radius: PropTypes.string,
    handleUpload: PropTypes.func,
    clickupload: PropTypes.bool,
};

Avatar.defaultProps = {
    src: '/images/share.svg',
};

export default Avatar;

