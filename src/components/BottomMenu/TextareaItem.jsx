import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.less';

class TextareaItem extends Component {

    constructor (props) {
        super(props);
        this.handleOnChangeText = this.handleOnChangeText.bind(this);
    }

    // 输入文字消息的事件
    handleOnChangeText (e) {
        // 给父组件传值=>输入框中是否有内容
        if (this.props.onChangeText) {
            let hasTextMessage;
            let textareaValue;

            if (e.target.value) {
                hasTextMessage = true;
                textareaValue = this.refs.refText.value;
            } else {
                hasTextMessage = false;
                textareaValue = '';
            }
            this.props.onChangeText({hasTextMessage, textareaValue});
        }

        // 关键是先设置为auto，目的为了重设高度（如果字数减少）
        this.refs.refTextWrap.style.height = 'auto';

        // 如果高度不够，再重新设置
        if (this.refs.refText.scrollHeight >= this.refs.refText.offsetHeight) {
            if (this.refs.refText.scrollHeight > '90') {
                this.refs.refTextWrap.style.height = '90px';
            } else {
                this.refs.refTextWrap.style.height = this.refs.refText.scrollHeight + 'px';
            }
        }
    }
    render () {
        const {placeholder} = this.props;
        return (
            <div className="textareaWrap" ref="refTextWrap">
                <textarea ref="refText" rows="1" cols="27" onChange={this.handleOnChangeText} placeholder={placeholder}></textarea>
            </div>
        );
    }
}

TextareaItem.propTypes = {
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
};

export default TextareaItem;
