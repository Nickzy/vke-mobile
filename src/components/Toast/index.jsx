import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class ToastDefined extends Component {

    render () {
        const icon = this.props.icon;
        let text = this.props.text;
        let textString = text.replace(/[0-9]/ig, '');
        return (
            <div>
                {text &&
                <div className="dialog-defined">
                    <i className={`icon iconfont ${icon}`}>
                        {icon === '0' && parseInt(text)}
                    </i>
                    <p>{textString}</p>
                </div>
                }
            </div>
        );
    }
}
ToastDefined.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
};

export default ToastDefined;
