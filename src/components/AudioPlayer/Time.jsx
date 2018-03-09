import React from 'react';
import PropTypes from 'prop-types';

/**
 * 处理数字，把0-9数字处理成00-09
 *
 * @param {int} num 要处理的数字
 * @returns {string} 数字字符串，像00、09、60
 */
function length2two (num) {
    if (num === 0) {return '00';}
    if (num >= 10) {return `${num}`;}
    return `0${num}`;
}

/**
 * 将时间格式化
 *
 * @param {int} time 以秒为单位的时间
 * @returns {string} 处理成标准的时间显示00:00:00
 */
function makeTimeString (time, isSecondDisplay) {
    if (isSecondDisplay) {
        return `${Math.floor(time)}`;
    }
    const SECONDS_PER_HOUR = 3600;
    const SECONDS_PER_MINUTE = 60;

    let remaining = time;
    let hour = Math.floor(remaining / SECONDS_PER_HOUR);
    remaining -= hour * SECONDS_PER_HOUR;
    let minute = Math.floor(remaining / SECONDS_PER_MINUTE);
    remaining -= minute * SECONDS_PER_MINUTE;
    let second = Math.floor(remaining);

    hour = length2two(hour);
    minute = length2two(minute);
    second = length2two(second);

    if (hour === '00') {
        return `${minute}:${second}`;
    } else {
        return `${hour}:${minute}:${second}`;
    }
}

/**
 * 显示时间的组件
 * @param {*} props 包含time的对象
 * @return {JSX.Element} 返回时间组件JSX元素
 */
const Time = function ({ time }) {
    return (
        <span> { `${makeTimeString(time, true)}"`}</span>
    );
};

Time.propTypes = {
    time: PropTypes.number.isRequired,
};

Time.defaultProps = {
    time: 0,
};

export default Time;
