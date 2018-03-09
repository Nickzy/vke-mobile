import React, { Component } from 'react';
import { Modal,WhiteSpace,WingBlank, Icon,List, InputItem,Button,Toast} from 'antd-mobile';
import PropTypes from 'prop-types';

import {courseAdmire} from '../../utils/api';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

class DefinedMoney extends Component {
    constructor (props) {
        super(props);
        this.state = {
            definedMoney:true,//其他金额弹框
        };
        this.handleOnclickDonate = this.handleOnclickDonate.bind(this);
    }
    componentWillMount(){
        const localLanguage=localStorage.getItem('language');
        this.setState({
            isEnglish:localLanguage,
            lang:localLanguage? enUS('DefinedMoney') : zhCN('DefinedMoney')
        })
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    handleOnclickDonate(){
        const money=parseFloat(document.querySelector('.fake-input').innerHTML).toFixed(2);
        let data={
            courseId: '5a166c2b562af81d55829638', 
            lecturerId: '59969ec9562af81675dad1ec',
            price:money
        }
        courseAdmire(data,(res)=>{
            console.log('自定义赞赏'+data.price+JSON.stringify(res));

            if(res.actionStatus){
                this.setState({ admireModal: false });
                Toast.success(this.state.lang.zanshchenggong, 1);
            }else{
                Toast.fail(this.state.lang.zanshshibai, 1);
            }
        })   
    }
    render () {      
        const isEnglish = this.state.isEnglish;
        const lang =this.state.lang;

        return (
            <Modal 
            visible={this.state.definedMoney}
            transparent
            maskClosable={true}
            onClose={this.onClose('definedMoney')}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
         <div className="modalWrap">
            <Icon type={'cross'} onClick={this.onClose('definedMoney')} className="closeModal"/>
            <h3>{lang.qitajine}</h3>
            <WingBlank>
                <List>
                    <InputItem
                        placeholder="0.00"
                        extra="¥"
                        type="money"
                    >{lang.jine}</InputItem>
                </List>
            </WingBlank><WhiteSpace size="lg"/>
            <div className="control_button">
                <Button type="primary" onClick={this.handleOnclickDonate}>{lang.queding}</Button>
            </div>
        </div>
        </Modal>
        );
    }  
}

export default DefinedMoney;
