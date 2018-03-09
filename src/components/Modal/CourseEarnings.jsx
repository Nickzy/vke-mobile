import React, { Component } from 'react';
import { Modal,WingBlank ,WhiteSpace,Icon} from 'antd-mobile';
import PropTypes from 'prop-types';

import {courseEarnings} from '../../utils/api';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class CourseEarnings extends Component {
    constructor (props) {
        super(props);
        this.state = {
            earnings: true,//课程收益
            money:{
                audioIn:'0',//旁听收益
                interIn:'0',//互动收益
                redIn:'0',//赞赏收益
                subsidyIn:'0',//补贴收益
            }
        };
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    componentWillMount(){
        courseEarnings({courseId: '5a166c2b562af81d55829638', lecturerId: '59969ec9562af81675dad1ec'}, (res) => {
            console.log('课程收益接口测试', res);
            if(res.actionStatus){
                this.setState({
                    money:res.data
                })
            }
        });
    }
    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('CourseEarnings') : zhCN('CourseEarnings');

        const {money}=this.state;
        const earningsArray=[
            {icon:'icon-me',text:lang.hudong,money:parseFloat(money.audioIn).toFixed(2)},
            {icon:'icon-me',text:lang.pangting,money:parseFloat(money.interIn).toFixed(2)},
            {icon:'icon-earnings',text:lang.zanshang,money:parseFloat(money.redIn).toFixed(2)},
            {icon:'icon-earnings',text:lang.butie,money:parseFloat(money.subsidyIn).toFixed(2)},
        ]
        return (
            <Modal
                visible={this.state.earnings}
                transparent
                maskClosable={true}
                onClose={this.onClose('earnings')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
            <div className="modalWrap has_top_backColor">
                <Icon type={'cross'}  onClick={this.onClose('earnings')}  className="closeModal"/>
                <div className='top_backColor'></div>
                <div className="iconDiv"><i className="icon iconfont icon-earnings"></i></div>
                <ul className="has_backColor_padding">
                {
                    earningsArray.map((item,i)=>{return(
                        <li key={i}>
                            <i className={`icon iconfont ${item.icon}`}></i>
                            <p className="info_title">{item.text}</p>
                            <span className="earningMoney">{item.money}</span>
                        </li>
                    )})
                }
                </ul> <WhiteSpace/>
                <div className='closeModal_btn' onClick={this.onClose('earnings')}>{lang.know}</div>
            </div>
            </Modal>
        );
    }  
}
CourseEarnings.propTypes = {
    type: PropTypes.string,
};

CourseEarnings.defaultProps = {
    type: 'earnings',
};
export default CourseEarnings;
