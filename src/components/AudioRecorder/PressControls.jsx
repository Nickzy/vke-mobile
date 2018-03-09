import React from 'react';
import {Tag, Badge} from 'antd-mobile';
import wx from 'weixin-js-sdk';
import PropTypes from 'prop-types';

import ToastDefined from '../Toast';


class PressControls extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            upping: false,
            TagwrapHandle: false,
            TagwrapTime: false,
            recordMsg: false,
        };
    }
    render () {
        let lang = this.props.langPress;
        
        let buttonString, tipString, callback;
        let {
            recording,
            finished,
            progress,
            duration,
        } = this.props.controlStates;
        let {toggle, finish, cancel, changeControls} = this.props.controlCallbacks;// 补充
        console.log(`录音状态:progress:${progress};duration${duration};finished:${finished};recording:${recording};`);
        let remainTime = duration - progress;

        if (recording) {
            buttonString = lang.clickEnd;
            if (remainTime > 0 && remainTime <= 10) {
                tipString = `${remainTime}${lang.daojishi}`;

            } else {
                tipString = '';
            }
            callback = () => {
                this.props.controlCallbacks.toggle();
                this.setState({
                    TagwrapHandle: true,
                    TagwrapTime: false,
                    recordMsg: true,
                });
            };
        } else {
            if (this.state.recordMsg) {
                buttonString = lang.clickSend;
                tipString = '';
                callback = () => {
                    this.props.controlCallbacks.finish();

                    this.setState({
                        TagwrapHandle: false,
                        TagwrapTime: false,
                        // add
                        recordMsg: false,

                    });
                };
            } else {
                buttonString = lang.clickrecord;
                tipString = '';
                callback = () => {
                    this.props.controlCallbacks.toggle();
                    this.setState({
                        TagwrapHandle: false,
                        TagwrapTime: true,
                        recordMsg: false,
                    });
                };
            }

        }

        return (
            <div className="pressControls">
                {recording &&
                <ToastDefined icon={'icon-voice-record'} text={`${tipString}`}/>
                }

                <div className="Tagwrap" style={{display: this.state.TagwrapHandle || 'none'}}>
                    <Tag onChange={() => {
                        this.props.controlCallbacks.cancel();
                        this.setState({TagwrapHandle: false, recordMsg: false});
                    }}>{lang.cancel}</Tag>
                    <Tag onChange={() => {
                        wx.playVoice({
                            localId: 'weixin://resourceid/8e6314b4e89197c9b7797e45faab6b24',
                        });
                    }}>{lang.play}</Tag>
                </div>
                <div className="Tagwrap" style={{display: this.state.TagwrapTime || 'none'}}>
                    <Tag><Badge dot></Badge><span className="timeValue">{progress}s/{duration}s</span></Tag>
                </div>

                <button className='noselect' onClick={callback}>{buttonString}</button>
                <i className="icon iconfont icon-switch" onClick={changeControls}></i>
            </div>
        );
    }
}

export default PressControls;
