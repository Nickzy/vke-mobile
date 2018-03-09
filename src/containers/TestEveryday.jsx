// 没有路由
import React, { Component } from 'react';
import { Flex, Toast} from 'antd-mobile';

import OptionsList from '../components/Daka/OptionsList.jsx';
import TestCard from '../components/Daka/TestCard.jsx';

import {questions, answer, wxConfig, isAuth} from '../utils/api/index';

function handleDisable () {
    console.log('没选答案');
}
class TestEveryday extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pageIn: 'testPage',
            handleCheck: false,
            answers: [],
            question: {
                title: null,
            },
            analysis: null,
            correctAnswer: null,
            questionId: null,
            isAnswer: false,
        };
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnClickNext (page) {
        switch (page) {
            case 'testPage':
                this.setState({
                    pageIn: 'analysis',
                    isAnswer: true,
                });
                break;
            case 'analysis':
                var url = window.location.href;
                var newUrl = url.replace('question', 'rank');
                window.location.href = newUrl;
                break;
            default: return;
        }
        if (this.state.handleCheck) {
            answer(this.state.questionId, this.state.chooseOption, (res) => {
                if (res.actionStatus && res.data) {
                    // console.log('答对了' + this.state.chooseOption);
                } else {
                    // console.log('答错了' + this.state.chooseOption);
                }
            });
            localStorage.setItem('questionId', this.state.questionId);
        }
    }
    handleOnClickPrev (page) {
        switch (page) {
            case 'analysis':
                this.setState({ pageIn: 'testPage' });
                break;
            default: return;
        }
    }
    // 回调函数
    handleOnSubmit (choose) {
        if (this.state.isAnswer) {
            Toast.info('您已选过', 1);
        } else {
            this.setState({
                chooseOption: choose.chooseOption,
                handleCheck: choose.handleCheck,
            });
        }
    }
    componentWillMount () {
        isAuth();
        wxConfig();
        questions((res) => {
            if (res.actionStatus) {
                res = res.data;
                this.setState({
                    answers: res.answers,
                    question: res.question,
                    analysis: res.analysis,
                    correctAnswer: res.correctAnswer,
                    questionId: res.questionId,
                });
                console.log('是否回答过' + res.isReply);
                if (res.isReply) {
                    var url = window.location.href;
                    var newUrl = url.replace('question', 'rank');
                    window.location.href = newUrl;
                }
            }
        });
    }

    render () {
        document.title = '每日一题';
        const {pageIn, handleCheck, question, analysis, correctAnswer, answers} = this.state;
        const userAnswer = parseInt(this.state.chooseOption) + 1 ? parseInt(this.state.chooseOption) : -1;
        return (
            <div>
                <div className="padding_bot">
                    <TestCard content={pageIn === 'testPage' ? question : analysis} correct={pageIn === 'analysis' && correctAnswer} page={pageIn}/>
                    <OptionsList userAnswer={userAnswer} onSubmit={this.handleOnSubmit} answers={pageIn === 'testPage' && answers}/>
                </div>
                <Flex justify="center" className="bottomBtn border_top">
                    <a style={{opacity: pageIn !== 'testPage' || 0}}
                        onClick={this.handleOnClickPrev.bind(this, pageIn)}>
                        上一步
                    </a>
                    <a style={{opacity: !this.state.handleCheck ? 0.7 : 1}}
                        onClick={handleCheck ? this.handleOnClickNext.bind(this, pageIn) : handleDisable()}
                        className="baseClolor">
                        下一步
                    </a>
                </Flex>
            </div>
        );
    }
}
export default TestEveryday;
