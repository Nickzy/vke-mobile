import React, { Component } from 'react';
import {WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';
import {media} from '../../config/urls';
import AudioPlayer from '../AudioPlayer';

import './style.less';

class TestCard extends Component {
    render () {
        let content = this.props.content;
        if (typeof content === 'string') {
            console.log('卡片是字符串');
            content = JSON.parse(content);
        }

        console.log('录音src' + JSON.stringify(content.voice));
        const voiceNull = JSON.stringify(content.voice);

        const correctAnswer = ['A', 'B', 'C', 'D', 'E', 'F'];
        console.log('内容' + content.content);
        return (
            <WingBlank>
                <WhiteSpace/>
                <div className="cardContainer">
                    <h3>{content.title}</h3>
                    {
                        (this.props.page === 'testPage' && voiceNull !== 'null')
                            ? <AudioPlayer src={`${media}target/${content.voice}`} duration={parseInt(content.duration) || 80}/>
                            : ''
                    }
                    {
                        (this.props.page === 'analysis' && voiceNull !== 'null')
                            ? <AudioPlayer src={`${media}target/${content.voice}`} duration={parseInt(content.duration) || 80}/>
                            : ''
                    }
                    <div className="text_grey" style={{whiteSpace: 'pre-wrap'}}> {content.content}</div>
                    {
                        this.props.correct && <p className="text_black"><br/>所以答案：选{correctAnswer[this.props.correct]}</p>
                    }
                </div>
            </WingBlank>
        );
    }
}
export default TestCard;

