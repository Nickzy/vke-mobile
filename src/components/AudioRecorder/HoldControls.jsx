import React from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Button, Toast, List, Flex} from 'antd-mobile';

import ToastDefined from '../Toast';

import './style.less';

class HoldControls extends React.Component {
    constructor (props) {
        super(props);
        this.state = { upping: false };
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }
    _onRecording () {
        const lang = this.props.langHold;

        let duration = this.props.controlStates.duration;
        let progress = this.props.controlStates.progress;
        let remainTime = duration - progress;

        if (this.state.upping) {
            return {
                butonText: lang.loosenEnd,
                tipIcon: 'icon-voice-cancel',
                tipText: lang.loosenCancel,
            };
        }
        if (remainTime > 0 && remainTime <= 10) {
            return {
                butonText: lang.loosenEnd,
                tipIcon: '0',
                tipText: `${remainTime}s${lang.autoSend}`,
            };
        }
        if (remainTime >= 10) {
            return {
                butonText: lang.loosenEnd,
                tipIcon: 'icon-voice-record',
                tipText: lang.upCancel,
            };
        }
        if (remainTime === 0) {
            return {
                butonText: lang.pressSay,
                tipIcon: 'icon-voice-failed',
                tipText: lang.tooLong,
            };
        }
    }

    _onStoping () {
        const lang = this.props.langHold;

        return {
            butonText: lang.pressSay,
            tipIcon: '',
            tipText: '',
        };
    }

    onTouchStart (event) {
        event.preventDefault();
        this.props.controlCallbacks.toggle();
        this.x1 = event.touches[0].clientX;
        this.y1 = event.touches[0].clientY;
    }

    onTouchMove (event) {
        event.preventDefault();
        this.x2 = event.touches[0].clientX;
        this.y2 = event.touches[0].clientY;
        if (this.y1 - this.y2 > 50) {
            this.setState({ upping: true });
        } else {
            this.setState({ upping: false });
        }
    }

    onTouchEnd () {
        const lang = this.props.langHold;

        event.preventDefault();
        this.props.controlCallbacks.toggle();
        if (!this.state.upping && this.props.controlStates.progress === 0) {
            Toast.info(<div><i className='icon iconfont icon-voice-failed'></i><p>{lang.repeat}</p></div>, 1);
        }
        setTimeout(() => {
            this.state.upping ? this.props.controlCallbacks.cancel()
                : this.props.controlCallbacks.finish();
            this.setState({ upping: false });
        }, 100);
    }

    render () {
        let {recording, progress, duration, localId} = this.props.controlStates;
        let {toggle, finish, cancel, changeControls} = this.props.controlCallbacks;
        let displayElement = recording ? this._onRecording() : this._onStoping();

        return (
            <div>
                {recording &&
                <ToastDefined icon={`${displayElement.tipIcon}`} text={`${displayElement.tipText}`}/>
                }
                <button className='noselect'
                    onTouchStart={this.onTouchStart}
                    onTouchMove = {this.onTouchMove}
                    onTouchEnd = {this.onTouchEnd}>
                    {displayElement.butonText}
                </button>
                <i className="icon iconfont icon-switch" onClick={changeControls}></i>
            </div>
        );
    }
}

export default HoldControls;

