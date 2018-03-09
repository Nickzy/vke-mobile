import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, Button, WhiteSpace, WingBlank ,Icon} from 'antd-mobile';
import PropTypes from 'prop-types';

import {courseOver} from '../../utils/api';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';


class EndClass extends Component {
    constructor (props) {
        super(props);
        this.state = {
            endClass: true,//结束课程
        };
        this.handleOnClickEndClass = this.handleOnClickEndClass.bind(this);
    }
    onClose = key => () => {
        this.setState({[key]: false});
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    handleOnClickEndClass(){
        courseOver({courseId: '5a01172f562af86adfc62bf5'}, (res) => {
            console.log('课程结束接口测试', res);
        }); 
        this.setState({endClass: false});//结束课程
    }
    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('EndClass') : zhCN('EndClass');
        // console.log('结束课程');   
        return (
            <Modal
                visible={this.state.endClass}
                transparent
                maskClosable={true}
                onClose={this.onClose('endClass')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
            <div className="modalWrap">
                <Icon type={'cross'}  onClick={this.onClose('endClass')}  className="closeModal"/>
                <WingBlank size="lg">
                    <h3>{lang.title}</h3>
                    <div className="text text_left">{lang.content}</div><WhiteSpace size="lg" />
                    <div className="control_button">
                        <Button type="default" onClick={this.onClose('endClass')}>{lang.cancel}</Button>
                        <Button type="primary" onClick={this.handleOnClickEndClass}>{lang.ok}</Button>
                    </div>
                </WingBlank>
            </div>
            </Modal>
        );
    }  
}
EndClass.propTypes = {
    type: PropTypes.string,
};

EndClass.defaultProps = {
    type: 'endClass',
};
// export default EndClass;

const mapStateToProps = (state) => ({
    endCourse: state.course,
});
export default connect(mapStateToProps)(EndClass);
