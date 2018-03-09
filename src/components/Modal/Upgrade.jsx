import React, { Component } from 'react';
import { Modal, WhiteSpace, Icon,Toast,WingBlank,Button} from 'antd-mobile';
import PropTypes from 'prop-types';

import enUS from '../../config/en_US';
import zhCN from '../../config/zh_CN';

import './style.less';

const prompt = Modal.prompt;
class Upgrade extends Component {
    constructor (props) {
        super(props);
        this.state = {
            upgradeModal:true,
        };
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            this.props.handleClose(false);
        }
    }
    render () {
        const isEnglish = this.props.isEnglish;
        const lang = isEnglish ? enUS('Upgrade') : zhCN('Upgrade');

        return (
            <Modal
                visible={this.state.upgradeModal}
                transparent
                maskClosable={true}
                onClose={this.onClose('upgradeModal')}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <div className="modalWrap has_base_botton">
                    <Icon type={'cross'} onClick={this.onClose('upgradeModal')} className="closeModal"/>
                    <WingBlank size="lg">
                        <h3>{lang.shengji}</h3>
                        <div className="text text_left">{lang.zhifu}</div><WhiteSpace size="lg" />
                    </WingBlank>
                    <div className="control_button">
                        <Button type="primary">
                        <i className="icon iconfont icon-wechat-pay"></i>{lang.weixinzhifu}</Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Upgrade;
