import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from './index';
import Upgrade from '../Modal/Upgrade';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

/**
 * 悬浮按钮组件
 * @memberof ScrollButton
 */
class ScrollButton extends Component {
    constructor (props) {
        super(props);
        this.state = {
            disLeft: 0,
            disTop: 0,
            setLeft: '10',
            setTop: '70%',
            touchTime: 0,
            upgradeModal: false, // 升级互动生
        };
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleCloseModal () {
        this.setState({
            upgradeModal: false,
        });
    }
    onTouchStart (event) {
        event.preventDefault();

        if (event.target.className === 'am-modal-wrap ') {
            this.setState({upgradeModal: false});
        }
        if (event.target.tagName === 'A' || event.target.tagName === 'SPAN') {
            console.log('微信支付对接数据');
            this.setState({upgradeModal: true});
        }
        if (event.target.tagName === 'use' || event.target.tagName === 'svg') {
            this.setState({upgradeModal: false});
        }

        const oBtn = document.querySelector('.scroll_btn');
        const screenWidth = 2 * document.body.clientWidth;

        this.x1 = event.touches[0].clientX;
        this.y1 = event.touches[0].clientY;

        this.setState({
            disLeft: event.touches[0].clientX - oBtn.offsetLeft,
            disTop: event.touches[0].clientY - oBtn.offsetTop,
            maxWidth: screenWidth - oBtn.offsetWidth,
        });
        // }
    }
    onTouchMove (event) {
        event.preventDefault();
        // if (event.target.className !== 'iconTextDiv') {
        //     return;
        // } else {
        const leftVal = event.touches[0].clientX - this.state.disLeft;
        const topVal = event.touches[0].clientY - this.state.disTop;

        this.setState({
            setLeft: leftVal > 0 ? leftVal < this.state.maxWidth ? leftVal : this.state.maxWidth : 0,
            setTop: topVal > 0 ? topVal : 0,
        });
        // }
    }

    onTouchEnd (event) {
        event.preventDefault();
        let changeLeft = 0;
        let changeTop = 0;
        if (this.state.setLeft !== '10') {
            changeLeft = Math.abs(this.state.setLeft + this.state.disLeft - this.x1);
        }
        if (this.state.setTop !== '70%') {
            changeTop = Math.abs(this.state.setTop + this.state.disTop - this.y1);
        }
        // console.log('移动距离', changeLeft, changeTop);

        if (changeLeft < 3 && changeTop < 3) {
            this.setState({ upgradeModal: true });
        } else {
            this.setState({ upgradeModal: false });
        }
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('ScrollButton') : zhCN('ScrollButton');

        return (
            <div className="scroll_btn" style={{left: this.state.setLeft, top: this.state.setTop}}
                onTouchStart = {this.onTouchStart}
                onTouchMove = {this.onTouchMove}
                onTouchEnd = {this.onTouchEnd}
            >
                <IconButton fn={true} icon={'icon-upgrade-to'} iconName={'upgradeIcon'} text={lang.shengji} idType='upgrade' isEnglish={isEnglish}/>
                {this.state.upgradeModal && <Upgrade handleClose={this.handleCloseModal} isEnglish={isEnglish}/>}
            </div>
        );
    }
}

export default ScrollButton;
