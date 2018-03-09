import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Tabs } from 'antd-mobile';
import PropTypes from 'prop-types';

import AreaForMessagesShow from '../AreaForMessagesShow';
import DiscussMsgPopUp from '../DiscussMsgPopUp';
import BottomMenu from '../BottomMenu';
import DiscussMenu from '../BottomMenu/DiscussMenu';
import ScrollButton from '../IconButton/ScrollButton';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

/**
 * 互动区与讨论区切换组件
 * @memberof TabForLive
 */
class TabForLive extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = {
            tabsIn: 0, // 初始状态在讨论区
            sendStatus: false,
            studentStatus: '旁听生',
            tabInInterval: true,
            tabInDiscuss: false,
            areaHeightToShort: false, // true时聊天区高度变矮
        };
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
        this.handleOnClickAdd = this.handleOnClickAdd.bind(this);
    }

    handleSubmitMessage (sendStatus) {
        this.setState({ sendStatus: true });
    }
    handleOnClickAdd (bottomGird) { // console.log('更多菜单');
        this.setState({areaHeightToShort: !!bottomGird.bottomStatus });
    }
    render () {
        const {isEnglish, over} = this.props;
        const lang = isEnglish ? enUS('TabForLive') : zhCN('TabForLive');

        const tabs = [
            { title: lang.title1 },
            { title: lang.title2 },
        ];
        const areaStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' };
        const areaContStyle = { width: '100%'};
        const noBottomHeight = document.documentElement.clientHeight - 120;
        const hasBottomHeight = noBottomHeight - 160;
        const areaSightheight = this.state.areaHeightToShort ? hasBottomHeight : noBottomHeight ;

        /**
        * @假设消息数据的数组
        * @IntervalMessages 为互动区消息
        * @DiscussMessages 为讨论区消息
        * @DiscussStudentMessages 取讨论区学员消息的前三条
        */
        const intervalMessages = this.props.intMsg.map((item, i) => (
            {
                from: item.userInfo.nickName,
                identity: item.userInfo.type,
                id: item.userInfo.studentId,
                avatar: item.userInfo.avatar,
                text: item.msgInfo.textContent,
                src: item.msgInfo.mediaId,
                type: item.infoType,
                sendStatus: item.complete,
                duration: item.msgInfo.second,
                seq: item.seq,
            }
        ));

        const discussMessages = this.props.disMsg.map((item, i) => (
            {
                from: item.userInfo.nickName,
                identity: item.userInfo.type,
                id: item.userInfo.studentId,
                avatar: item.userInfo.avatar,
                text: item.msgInfo.textContent,
                type: item.infoType,
                src: item.msgInfo.mediaId,
                sendStatus: item.complete,
                duration: item.msgInfo.second,
                seq: item.seq,
            }
        ));
        var popMessages = discussMessages.slice(-3);
        // console.log('讨论区消息' + JSON.stringify(discussMessages));
        return (
            <div id="tab">
                <Tabs tabs={tabs}
                    onChange={(tab, index) => {
                        if (index === 0) {
                            this.setState({
                                tabInInterval: true,
                                tabInDiscuss: false,
                                areaHeightToShort: false,
                            });
                        } else {
                            this.setState({
                                tabInInterval: false,
                                tabInDiscuss: true,
                                areaHeightToShort: false,
                            });
                        }
                    }}
                    onTabClick={(tab, index) => {
                        if (index === 0) {
                            this.setState({
                                tabInInterval: true,
                                tabInDiscuss: false,
                            });
                        } else {
                            this.setState({
                                tabInInterval: false,
                                tabInDiscuss: true,
                            });
                        }
                    }}
                    useOnPan={false}// 使用跟手滚动
                >
                    <div style={areaStyle}>
                        <div style={areaContStyle}>
                            <AreaForMessagesShow intervalMessages={intervalMessages} height={areaSightheight} isEnglish={isEnglish} over={over}/>
                            <DiscussMsgPopUp popMessages={popMessages} isEnglish={isEnglish}/>
                        </div>
                    </div>
                    <div style={areaStyle}>
                        <div style={areaContStyle}>
                            <AreaForMessagesShow discussMessages={discussMessages} height={areaSightheight} isEnglish={isEnglish} over={over}/>
                            {this.state.studentStatus === '旁听生' && <ScrollButton isEnglish={isEnglish}/>}
                        </div>
                    </div>
                </Tabs>
                {this.state.tabInInterval && <BottomMenu onSubmit={this.handleSubmitMessage} handleAdd={this.handleOnClickAdd} isEnglish={isEnglish}/> }
                {this.state.tabInDiscuss && <DiscussMenu handleAdd ={this.handleOnClickAdd} isEnglish={isEnglish}/>}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    intMsg: state.message,
    disMsg: state.disMsg,
});
export default connect(mapStateToProps)(TabForLive);

