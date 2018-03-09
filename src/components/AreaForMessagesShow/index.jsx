import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, Toast} from 'antd-mobile';

import MessageBox from '../MessageBox';
import {getPrePageGroupHistoryMsgs} from '../../utils/webim/getHistoryMsg';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class AreaForMessagesShow extends Component {

    constructor (props) {
        super(props);
        this.state = {
            // 为拉取消息配置的状态
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
        };
    }
    componentDidMount () {
        const setHeight = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({ height: setHeight }), 0);
    }

    render () {
        const {isEnglish, over, height} = this.props;
        const lang = isEnglish ? enUS('AreaForMessagesShow') : zhCN('AreaForMessagesShow');

        const intervalMessages = this.props.intervalMessages;
        const discussMessages = this.props.discussMessages;
        var messages = null;
        var selfType = null;
        var seq = null; // 为了保证遍历消息组件时seq的唯一性

        if (intervalMessages) {
            messages = intervalMessages;
            selfType = 'live';
            seq = 'l';
        } else if (discussMessages) {
            messages = discussMessages;
            selfType = 'discuss';
            seq = 'd';
        } else {
            console.log('两个区域都没有消息');
        }
        return (
            <div className="messageAreaWrap" style={{height: height}}>
                <PullToRefresh
                    ref={(el) => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={{ deactivate: lang.xiala}}
                    direction={over ? 'up' : 'down'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        getPrePageGroupHistoryMsgs(20, selfType, (res) => {
                            // if (over) {
                            //     location.href = '#messagesBottom';
                            // } else {
                            //     location.href = '#messagesTop';
                            // }
                            if (!res.length) {Toast.info('别扯了，没有啦', 1);}
                            console.log(res.length);
                        });
                        this.setState({ refreshing: true });
                        setTimeout(() => {this.setState({ refreshing: false });}, 1000);
                    }}
                >
                    <div className="messageArea">
                        {/* <div id="messagesTop"></div> */}
                        {
                            messages.map((item) => (
                                <MessageBox Messages={item} key={seq + item.seq} isEnglish={isEnglish}/>
                            ))
                        }
                        <div id="messagesBottom"></div>
                    </div>
                </PullToRefresh>
            </div>
        );
    }
}

export default AreaForMessagesShow;
