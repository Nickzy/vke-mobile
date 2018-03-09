import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Donate from '../Modal/Donate';

import './style.less';

class IconButton extends Component {

    constructor (props) {
        super(props);
        this.state = {
            iconStatus: {
                iconName: props.iconName,
                icon: props.icon,
                text: props.text,
                fn: props.fn,
            },
            admireModal: false, // 赞赏弹框
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleCloseModal () {
        this.setState({
            admireModal: false,
        });
    }
    handleOnClick (idType) {
        switch (idType) {
            case 'admire':
                this.setState({ admireModal: true });
                break;
            default: return;
        }
    }

    render () {
        const isEnglish = this.props.isEnglish;

        const {iconStatus} = this.state;
        return (
            <div>
                <div className={iconStatus.iconName} onClick={iconStatus.fn && this.handleOnClick.bind(this, this.props.idType)}>
                    {iconStatus.icon && <div className="icon_wrap"><i className={`icon iconfont ${iconStatus.icon}`}></i></div>}
                    <div className="iconTextDiv">{iconStatus.text}</div>
                </div>
                {this.state.admireModal && <Donate handleClose={this.handleCloseModal} isEnglish={isEnglish}/>}
            </div>
        );
    }
}

IconButton.propTypes = {
    fn: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string,
    idType: PropTypes.string,
    iconName: PropTypes.string,
};

export default IconButton;
