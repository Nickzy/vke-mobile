import React, { Component } from 'react';
import { Modal,WingBlank,WhiteSpace,Icon,Toast } from 'antd-mobile';
import PropTypes from 'prop-types';

import {courseEvaluate } from '../../utils/api';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class RateClass extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rateClass: true,//评价
        };
        this.handleOnClickRateClass = this.handleOnClickRateClass.bind(this);
    }
    componentWillMount(){
        const localLanguage=localStorage.getItem('language');
        this.setState({
            isEnglish:localLanguage,
            lang:localLanguage? enUS('RateClass') : zhCN('RateClass')
        })
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    handleOnClickRateClass(){
        const content=document.querySelector('textarea').value;
        let data = {
            courseId: '59fa861d562af83750b4bf9a',
            courseStar: 5,
            lecturerStar: 5,
            content: content,
        };
       
        courseEvaluate(data, (res) => {
            console.log('课程评价接口测试', res);
            if(res.actionStatus){
                this.setState({ rateClass: false })
                Toast.success(this.state.lang.success, 1);
                document.querySelector('textarea').value='';
            }else{
                Toast.fail(this.state.lang.fail, 1);
            }
        });
    }
    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('RateClass') : zhCN('RateClass');
        // console.log('评价课程');   
        return (
            <Modal
                visible={this.state.rateClass}
                transparent
                maskClosable={true}
                onClose={this.onClose('rateClass')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
             <div className="modalWrap rateModal">
                <Icon type={'cross'}  onClick={this.onClose('rateClass')}  className="closeModal"/>
                <h3>{lang.title}</h3>
                <div className="text_left border_top"><WhiteSpace/>                                                
                    <WingBlank>
                    <p className="rate_text">{lang.course}：</p>
                    <p className="rate_text">{lang.lecturer}：</p>
                    </WingBlank>
                </div><WhiteSpace/>                                
                <textarea placeholder={lang.textarea} rows="4"></textarea><WhiteSpace/>
                <div className="submit_button" onClick={this.handleOnClickRateClass}>{lang.submit}</div>
            </div>
            </Modal>
        );
    }  
}
RateClass.propTypes = {
    type: PropTypes.string,
};

RateClass.defaultProps = {
    type: 'rateClass',
};
export default RateClass;
