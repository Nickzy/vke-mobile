import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

/**
 * 文字消息组件
 * @memberof TextMessage
 */
class TextMessage extends Component {
    render () {
        return (
            <div className="message-text">
                {this.props.text}
            </div>
        );
    }
}
TextMessage.propTypes = {
    text: PropTypes.string.isRequired,
};
export default TextMessage;
