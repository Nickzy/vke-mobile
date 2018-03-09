import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

/**
 * 图片展示
 * @property {string} src 背景图片链接
 * @property {number} width 图片宽度，默认100%显示
 * @property {number} height 图片高度，默认100%显示
 * @property {number} radius 圆角大小 ，默认圆角
 * @property {string} border 默认有边框
 */

class ImageShow extends Component {
    render () {
        let { src, width, height, radius, border} = this.props;

        const avatarStyle = {
            width: width + 'px',
            height: height + 'px',
            borderRadius: radius + 'px',
            overflow: 'hidden',
            border: border,
        };
        return (
            <img src={src} style = {avatarStyle}/>
        );
    }
}
ImageShow.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    radius: PropTypes.string,
    border: PropTypes.string,
};
ImageShow.defaultProps = {
    width: '100%',
    height: 'auto',
    radius: '50%',
    border: 'none',
};
export default ImageShow;

