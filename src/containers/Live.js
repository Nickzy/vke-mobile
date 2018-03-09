import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Switch, LocaleProvider} from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import LiveHeader from '../components/LiveHeader';
import TabForLive from '../components/TabForLive';
import ModalPopup from '../components/Modal';
import {sdkLogin} from '../utils/webim/login/login';
import {handleHistoryMsg } from '../reducers/message';
import {getGroupMemberInfo} from '../utils/webim/group/memberLIst';
import {webim} from '../utils/webim';
import {webimInit, auditUpdate, courseItem, courseEarnings, courseEvaluate, courseOver, courseAdmire, wxConfig} from '../utils/api';
import {init} from '../utils/api/init';
import {recallMsg} from '../utils/webim/recallMsg';
import {webimPublic} from '../utils/webim/webimPublic';

import { setTimeout } from 'timers';
class Live extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isEnglish: false, // 默认中文模式
            courseStatus: '正在直播', // 已经结束
        };
        this.handleOnChangeLanguage = this.handleOnChangeLanguage.bind(this);
    }
    componentWillMount () {
        const localLanguage = localStorage.getItem('language');
        if (localLanguage && localLanguage === 'true') {
            this.setState({isEnglish: true});
        }
    }
    componentDidMount () {
        let loginInfo = {
            sdkAppID: '1400023689',
            appIDAt3rd: '1400023689',
            accountType: '8341',
            identifier: '59e59330562af80df36612f5',
            identifierNick: '远方的我房间',
            liveId: '5a1519e0562af837d8ef3f02',
            userSig: 'eJxFkF1Pg0AQRf8Lrxrdjy5lTXwg9CNYSmKhjeVlg*yCE4Suy9Zgjf9dJCW*3nMnM2e*nTRK7nKtQYrcCmqk8*Ag53aMVa-BKJGXVpkhxowxgtBEP5Xp4NQOgCDMMKEI-UOQqrVQwjjIuGKcUsRckpcekiV1XUxKdu12UA2l7XIfhM*LaBOppOsbniFY7wsvtYfaqK3Ps3R36eY3lf*k4SXODpsqrBbHPn3v5DlZxTVaGhoEiYaw8tdN-WHfduboXu7r*HVltPc4LZO1GHX-hGbDwYS6Hr9CC40aRTGe8Tlmk01eFKdza4X90mr8z88veeRcuQ__',
        };
        sdkLogin(loginInfo);
        let pot = {
            courseId: '5a214e75562af820fa02389f',
            price: 0,

        };
        auditUpdate(pot, (res) => {
            console.log('升级互动生测试接口', res);
        });
        webimInit();
    }
    handleOnChangeLanguage () {
        this.setState({
            isEnglish: !this.state.isEnglish,
        });
    }
    render () {
        const languageStyle = {
            position: 'fixed',
            left: 0,
            width: '100%',
            zIndex: '20',
            top: '70px',
        };
        const isEnglish = this.state.isEnglish;
        const locale = isEnglish ? enUS : undefined;
        return (
            <LocaleProvider locale={locale}>
                <div>
                    <div className='languageTab' style={languageStyle}>
                        <Switch
                            checked={isEnglish}
                            onClick={this.handleOnChangeLanguage}
                            onChange={localStorage.setItem('language', isEnglish)}
                        />{isEnglish ? 'English' : '中文'}
                    </div>
                    <LiveHeader students={10} courseStatus={this.state.courseStatus} isEnglish={isEnglish}/>
                    <TabForLive isEnglish={isEnglish} over={this.state.courseStatus === '已经结束'}/>
                    <ModalPopup isEnglish={isEnglish}/>
                </div>
            </LocaleProvider>
        );
    }
}
const mapStateToProps = (state) => ({
    props: state,
});
export default connect(mapStateToProps)(Live);
