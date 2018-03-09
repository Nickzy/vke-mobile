import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {WhiteSpace, WingBlank} from 'antd-mobile';
import './style';

class OptionsList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            myOption: null, // 没选答案
        };
        this.handleOnClickCorrect = this.handleOnClickCorrect.bind(this);
    }

    handleOnClickCorrect (e) {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                handleCheck: true,
                chooseOption: e.target.id,
            });
        }
    }
    render () {
        const optionNum = ['A', 'B', 'C', 'D', 'E', 'F'];
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.answers && this.props.answers.map((item, i) => (
                    <label className="checkLabel" key={i}>
                        <div className={`check_default ${this.props.userAnswer === i ? 'check_primary' : null}`}>
                            <div className="check_center"></div>
                        </div>
                        <input type="radio" name="correct" id={i} onClick={this.handleOnClickCorrect}/>
                        <p className="text_black">{`${optionNum[i]}: ${item}`}</p>
                    </label>
                ))}
                <WhiteSpace/>
            </WingBlank>
        );
    }
}


export default OptionsList;
