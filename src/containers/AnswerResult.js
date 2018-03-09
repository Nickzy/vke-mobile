import React, { Component } from 'react';
import { Button, Flex, WhiteSpace, WingBlank} from 'antd-mobile';
import {Link} from 'react-router-dom';

import Avatar from '../components/Avatar';
import SuccessModal from '../components/Daka/SuccessModal';
import FailModal from '../components/Daka/FailModal';

import {dakaRankList, myDaka, isAuth, wxConfig, questions} from '../utils/api/index';
import {rankUrl} from '../config/urls';

import '../components/styles/style.less';

function add0 (m) {return m < 10 ? '0' + m : m;}
function formatTimeStamp (time) {
    if (!time) {
        return false;
    }
    var time = new Date(time);
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return add0(h) + ':' + add0(mm) + ':' + add0(s);
}

class AnswerResult extends Component {
    constructor (props) {
        super(props);
        this.state = {
            myCode: null, // 答题失败/成功
            achieveCourseModal: false, // 领取课程
            failModal: false, // 答题失败模态层
            myDaka: {},
            dakaList: [],
            shareId: false, // true为被分享
            isCorrect: false, // 用户的答案
            isReply: false, // 我是否答过题
            myReplyIsCorrect: false, // 我的答案正确与否
            noUserInfo: false, // 没请求到用户信息
        };
        this.handleOnClickAchieveCourse = this.handleOnClickAchieveCourse.bind(this);// 答题成功模态层
        this.handleOnClickToAnswer = this.handleOnClickToAnswer.bind(this);// 点击开始答题
        this.handleCloseModal = this.handleCloseModal.bind(this);// 关闭模态层
        this.handleOnClickFail = this.handleOnClickFail.bind(this);// 答题失败模态层
    }
    componentWillMount () {
        isAuth();
        wxConfig();
        let shareId = location.href.split('shareId=')[1];
        const questionId = localStorage.getItem('questionId') ;

        if (shareId) {
            shareId = shareId.split('#')[0];
            this.setState({ shareId: true }); // 被分享查看
        } else {
            this.setState({ shareId: false });// 用户自己进入
        }
        questions((res) => {
            this.setState({ isReply: res.data.isReply });
        });

        myDaka(questionId, shareId, (res) => {
            console.log('请求用户的答题数据' + JSON.stringify(res));
            res = res.data;

            var stringRes = JSON.stringify(res);
            var UserInfoData = stringRes.indexOf('isCorrect') > -1;// 用户答题数据没请求到
            if (!UserInfoData) {
                console.log('用户答题数据没请求到' + questionId, shareId);
                this.setState({noUserInfo: true});
            } else {
                this.setState({
                    myDaka: res,
                    isCorrect: res.isCorrect, // 当前用户的答案
                    myCode: res.channelCode,
                    myReplyIsCorrect: res.myReplyIsCorrect,
                });
            }
        });
        dakaRankList((res) => { // 请求排行榜数据
            this.setState({ dakaList: res.data });
        });
    }
    // 答题成功的模态层
    handleOnClickAchieveCourse () {
        this.setState({ achieveCourseModal: true });
    }
    // 答题失败的模态层
    handleOnClickFail () {
        this.setState({ failModal: true });
    }
    handleCloseModal (close) {
        console.log('是否关闭' + JSON.stringify(close));
        this.setState({
            achieveCourseModal: false,
            failModal: false,
        });
    }
    handleOnClickToAnswer () {
        window.location.href = rankUrl;
    }
    render () {
        document.title = '排行榜';
        const {myDaka, dakaList} = this.state;
        let myRate = '';
        if (parseInt(myDaka.rank) === 1) {
            myRate = '100%';
        } else {
            myRate = parseFloat(myDaka.rank || 0).toFixed(4)
                .slice(2, 4) + '%';
        }

        return (
            <div className="answer_result_wrap">
                <div style={{display: this.state.noUserInfo || 'none'}}>
                    <img src="http://resource.zhishimao.cn/images/punch.png" className="noUserInfoImg"/>
                    <WingBlank>
                        <div className="rank_list">
                            <h4>排行榜</h4>
                            {
                                dakaList && dakaList.map((item, i) => (
                                    <div key={i}>
                                        <Flex justify="start">
                                            <div className="flex_grow">
                                                <div className="num">{parseInt(i + 1)}</div>
                                            </div>
                                            <Avatar src={item.avatar}/>
                                            <p>{item.nickName}</p>
                                            <div className="littleReguGrey">{formatTimeStamp(item.startTime)}</div>
                                        </Flex>
                                        <WhiteSpace/>
                                    </div>
                                ))
                            }
                        </div>
                    </WingBlank>
                </div>
                <div style={{display: !this.state.noUserInfo || 'none'}}>
                    <div className="back_blue"></div>
                    {
                        this.state.isCorrect
                            ? <div className="pop_alert pop_more">
                                今天击败了<span>{myRate}</span>的用户，今天获得了一节免费外教课，点击
                                <span onClick={this.handleOnClickAchieveCourse}>领取语音外教课</span>
                            </div>
                            : <div className="pop_alert">抱歉，今天答题失败，明天继续加油</div>
                    }


                    <div className="rank_container">
                        <div className="rank_card">
                            <WingBlank>
                                <Flex justify="start">
                                    <Avatar src={myDaka.avatar}/>
                                    <h4>{myDaka.nickName}</h4>
                                </Flex>
                                <WhiteSpace size="lg"/>
                                <div className="border_top">
                                    <WhiteSpace size="lg"/>
                                    <Flex justify="center">
                                        <Flex.Item>
                                            <div className="littleReguGrey tc">答题时间</div>
                                            <p className="text_black tc">{formatTimeStamp(myDaka.startTime) || '--:--:--'}</p>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div className="littleReguGrey tc">答题次数</div>
                                            <p className="text_black tc">{myDaka.answerCount || '0'}</p>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div className="littleReguGrey tc">今日排名</div>
                                            <p className="text_black tc">{myDaka.topRank || '未上榜'}</p>
                                        </Flex.Item>
                                    </Flex>
                                </div>
                            </WingBlank>
                        </div>
                        <div className="rank_list">
                            <h4>排行榜</h4>
                            {
                                dakaList && dakaList.map((item, i) => (
                                    <div key={i}>
                                        <Flex justify="start">
                                            <div className="flex_grow">
                                                <div className="num">{parseInt(i + 1)}</div>
                                            </div>
                                            <Avatar src={item.avatar}/>
                                            <p>{item.nickName}</p>
                                            <div className="littleReguGrey">{formatTimeStamp(item.startTime)}</div>
                                        </Flex>
                                        <WhiteSpace/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Flex className="bottomBtn border_top" justify="center">
                    { this.state.isReply
                        ? this.state.myReplyIsCorrect
                            ? <a className="default_btn" onClick={this.handleOnClickAchieveCourse}>答题成功，领取外教课</a>
                            : <a className="default_btn" onClick={this.handleOnClickFail}>答题失败，明天继续加油</a>
                        : <a className="default_btn" onClick={this.handleOnClickToAnswer}>开始答题</a>
                    }
                </Flex>
                {this.state.achieveCourseModal && <SuccessModal rate={myRate} code={this.state.myCode} shareTimeRecord={localStorage.getItem('shareTime')} handleClose={this.handleCloseModal}/>}
                {this.state.failModal && <FailModal handleClose={this.handleCloseModal}/>}
            </div>
        );
    }
}
export default AnswerResult;
