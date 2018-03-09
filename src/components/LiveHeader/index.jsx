import React, { Component } from 'react';
import PropTypes from 'prop-types';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

/**
 * 顶部课程描述组件
 * @memberof LiveHeader
 */
class LiveHeader extends Component {

    constructor (props) {
        super(props);
        this.state = {
            students: props.students,
            courseStatus: props.courseStatus,
        };
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('LiveHeader') : zhCN('LiveHeader');

        return (
            <div id="courseInfo">
                <span className="studentNums">{this.state.students}{lang.renci}</span>
                <strong>&bull;</strong>
                <span className="courseStatus">{this.state.courseStatus}</span>
            </div>
        );
    }
}

LiveHeader.propTypes = {
    students: PropTypes.number.isRequired,
    courseStatus: PropTypes.string.isRequired,
};

LiveHeader.defaultProps = {
    students: 6,
    courseStatus: '即将开始',
};

export default LiveHeader;
