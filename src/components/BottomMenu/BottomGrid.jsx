import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid, Modal} from 'antd-mobile';
import PropTypes from 'prop-types';

import CourseEarnings from '../Modal/CourseEarnings';
import BigPicShow from '../Modal/BigPicShow';
import EndClass from '../Modal/EndClass';
import RateClass from '../Modal/RateClass';
import ModalPopup from '../Modal';

import { courseCollect } from '../../utils/api';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

class BottomGrid extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modalType: null,
            loginIdentity:'lecturer',
        };
        this.handleCloseModal=this.handleCloseModal.bind(this);
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    handleCloseModal () {
        this.setState({ modalType: null });
    }

    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('BottomGrid') : zhCN('BottomGrid');

        const isCollect=this.props.courseInfo.isCollect ? lang.isShou : lang.shoucang;
        const iconfont='icon iconfont icon-';
        const addHandleIcon = [
            {icon: `${iconfont}earnings1`, text: lang.earnings1, color: '#FEC631', type: 'earnings'},
            {icon: `${iconfont}end-class`, text: lang.end, color: '#F44C36', type: 'endClass'},            
            {icon: `${iconfont}edit-class1`, text: lang.edit, color: '#3ca5ff', type: 'editClass'},
            {icon: `${iconfont}query-class`, text: lang.query, color: '#FEC631', type: 'queryClass'},
            {icon: `${iconfont}public`, text: lang.public, color: '#f34c3b', type: 'publicClass'},
            {icon: `${iconfont}home`, text: lang.home, color: '#25D8EF', type: 'home'},            
            {icon: `${iconfont}share`, text: lang.share, color: '#FEC631', type: 'shareClass'},                        
            {icon: `${iconfont}favorites`, text: isCollect, color: '#25D8EF', type: 'favourite'},   
            {icon: `${iconfont}rate`, text: lang.rate, color: '#3ca5ff', type: 'rateClass'},
        ];
        let handleIconByIdentity=null;
        const modalValue=null;
        const loginIdentity=this.state.loginIdentity;

        if(loginIdentity === 'lecturer'){
            handleIconByIdentity=addHandleIcon.slice(0,9);
        }else{
            handleIconByIdentity=addHandleIcon.slice(3,9);         
        }

        const data = handleIconByIdentity.map((item, i) => ({
            icon: item.icon,//icon名
            text: item.text,//icon对应文字提示
            color: item.color,//icon颜色
            modalType: item.type,//icon类型
        }));
        
        return (
            <div>
                <Grid data={data} itemStyle={{ height: '80px'}} columnNum={4} hasLine={false} isCarousel 
                    onClick={
                        (_el) =>{
                            this.setState({modalType:_el.modalType});
                            switch (_el.modalType) {
                                case 'favourite' :
                                    const isCollect=!this.props.courseInfo.isCollect;
                                    courseCollect({courseId: '5a1519e0562af837d8ef3f02', isCollect: isCollect});
                                    break;
                                default: return
                            }
                        }
                    }
                    renderItem={(dataItem, i) => (
                        <div key={i}>
                            <i className={dataItem.icon} style={{ color: dataItem.color, fontSize: '20px'}}></i>
                            <div style={{ color: '#999', fontSize: '12px', lineHeight: '12px'}}>
                                <span>{dataItem.text}</span>
                            </div>
                        </div>
                    )} />
                {this.state.modalType==='earnings' && <CourseEarnings type={this.state.modalType} handleClose={this.handleCloseModal} isEnglish={isEnglish}/> }
                {this.state.modalType==='shareClass' && <BigPicShow type={this.state.modalType}  src='/images/share.svg' handleClose={this.handleCloseModal} isEnglish={isEnglish}/>}
                {this.state.modalType==='endClass' && <EndClass type={this.state.modalType} handleClose={this.handleCloseModal} isEnglish={isEnglish}/> }
                {this.state.modalType==='publicClass' && <ModalPopup type={this.state.modalType} handleClose={this.handleCloseModal} isEnglish={isEnglish}/> }
                {this.state.modalType==='rateClass' && <RateClass type={this.state.modalType} handleClose={this.handleCloseModal} isEnglish={isEnglish}/> }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    courseInfo: state.course,
});
export default connect(mapStateToProps)(BottomGrid);

