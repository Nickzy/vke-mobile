import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigPicShow from '../../Modal/BigPicShow';
import './style.less';

class ImageMessage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bigPicShow: false, // 图片大图展示
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    handleOnClick () {
        this.setState({ bigPicShow: true });
    }
    handleCloseModal () {
        this.setState({
            bigPicShow: false,
        });
    }
    render () {
        return (
            <div className="message-pic">
                <img src={this.props.src} onClick={this.handleOnClick}/>
                {this.state.bigPicShow && <BigPicShow src={this.props.src} handleClose={this.handleCloseModal}/>}
            </div>
        );
    }
}
ImageMessage.propTypes = {
    src: PropTypes.string.isRequired,
};

export default ImageMessage;
