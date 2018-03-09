import React, { Component } from 'react';
import { Modal, WingBlank,WhiteSpace, Icon,Toast,Flex} from 'antd-mobile';
import PropTypes from 'prop-types';

import DefinedMoney from '../Modal/DefinedMoney';
import {courseAdmire} from '../../utils/api';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

const prompt = Modal.prompt;
class Donate extends Component {

    constructor (props) {
        super(props);
        this.state = {
            admireModal: true, // 赞赏弹框
            lecturerName:"Andy",
            definedMoney:false,//其他金额弹框
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOnClickMoney = this.handleOnClickMoney.bind(this);
    }
    componentWillMount(){
        const localLanguage=localStorage.getItem('language');
        this.setState({
            isEnglish:localLanguage,
            lang:localLanguage? enUS('Donate') : zhCN('Donate')
        })
    }
    onClose = key => () => {
        this.setState({[key]: false});
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    handleOnClick () {
        if(this.state.idType==='admire'){
            this.setState({admireModal: true});
        }
    }
    handleOnClickMoney(e){
        const money=parseInt(e.target.innerText);
        
        let data={
            courseId: '5a166c2b562af81d55829638', 
            lecturerId: '59969ec9562af81675dad1ec',
            price:money
        }
        courseAdmire(data,(res)=>{
            // console.log('选择赞赏钱数'+data.price+JSON.stringify(res));
            console.log('选择赞赏钱数'+data.price);
            if(res.actionStatus){
                this.setState({ admireModal: false });
                Toast.success(this.state.lang.zanshchenggong, 1);
            }else{
                Toast.fail(this.state.lang.zanshshibai, 1);
            }
        })            
    }
    handleCloseModal () {
        this.setState({
            definedMoney: false,
            admireModal: true
        });
    }
    
    render () {
        const lang=this.state.lang;
        const isEnglish=this.state.isEnglish;

        const donateMoney=[2,5,10,50,100,200];
        return (
            <Modal
                visible={this.state.admireModal}
                transparent
                maskClosable={true}
                onClose={this.onClose('admireModal')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                    <div className="modalWrap has_top_backColor">
                    <Icon type={'cross'} onClick={this.onClose('admireModal')} className="closeModal"/>
                    <div className='top_backColor'></div>
                    <div className="has_backColor_padding">
                        <div className="iconDiv noborder">
                            <img src="/images/invite.png" className="modal_avatar"/>
                        </div>
                        <p className="info_title">{this.state.lecturerName}</p><WhiteSpace size="xs"/>
                        <p className="info_text">{lang.aizanshang}</p><WhiteSpace/>        
                        <div className="border_top">
                            <WingBlank>
                                <Flex wrap="wrap">
                                    {donateMoney.map((item,i)=>{return(
                                        <div key={i} className="admire_money" onClick={this.handleOnClickMoney}>{lang.qian} {item}</div>
                                    )})}
                                </Flex>
                            </WingBlank>
                        </div><WhiteSpace size="xl"/>                        
                        <div className='other_defined info_title' >
                            <label  onClick={()=>{this.setState({admireModal: false,definedMoney:true})}}>
                                <i className="icon iconfont icon-earnings1"></i>{lang.qitajine}
                            </label>
                            {this.state.definedMoney && <DefinedMoney handleClose={this.handleCloseModal} isEnglish={isEnglish}/>} 
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Donate;
