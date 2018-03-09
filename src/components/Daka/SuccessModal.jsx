import React, { Component } from 'react';
import { Modal,WhiteSpace,Icon,Toast } from 'antd-mobile';
import Clipboard from 'react-clipboard.js';
import PropTypes from 'prop-types';
import {wxConfig} from '../../utils/api/index';
import './style.less';

function timeFormat (time) {
    var formatTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    return formatTime;
}
function timeRep(oldTime,nowTime){
    if( oldTime == nowTime){
        return true;
    }else{
        return false;
    }
}

class AchieveCourse extends Component {
    constructor (props) {
        super(props);
        this.state = {
            shareCue: false, // 分享提示
            achieveCourse: false,//进入直播间时课程信息弹框 
            shareStatus:false, //true/false => 分享过/每分享过
        };
        this.handleOnClickToast=this.handleOnClickToast.bind(this);
    }
    onClose = key => () => {
        this.setState({ [key]: false });
        if (this.props.handleClose) {
            const { close} = this.state.achieveCourse;
            this.props.handleClose({close})
        }
    }
    componentWillMount(){
        //判断是否已分享
        if(this.props.shareTimeRecord){
            const shareTime=localStorage.getItem('shareTime');
            const newTime=timeFormat (new Date());
            //分享过且为同一天分享
            if(timeRep(shareTime,newTime)){
                this.setState({
                    shareCue:false,
                    achieveCourse:true,
                })
            }else{
                this.setState({
                    shareCue:true,
                    achieveCourse:false,
                })
            }
        }else{
            this.setState({
                shareCue:true,
                achieveCourse:false,
            })
        }
        // 再次判断分享状态
        const questionId = localStorage.getItem('questionId') ;
        const shareOpt={
            type:'question',
            desc: this.props.rate,        
        }
        //分享方法
        wxConfig(shareOpt,(res)=>{
            console.log('分享返回'+JSON.stringify(res));
            let resultStatus= res.errMsg.indexOf('ok');

            if(resultStatus>-1){// alert('分享成功!'+res);
                this.setState({
                    shareCue:false,
                    achieveCourse:true,
                })
            }
            else{// alert('没分享成功'+res) ;       
            }
            localStorage.setItem('shareTime',timeFormat (new Date()));//记录分享的时间
        })
    }
    handleOnClickToast(){ Toast.info('已复制',1); }

    render () {
        return (
            <div>
                <div  onClick={this.onClose('shareCue')}>
                    <Modal className="shareCueImg"
                            visible={this.state.shareCue}
                            transparent
                            maskClosable={true}
                            onClose={this.onClose('shareCue')}
                            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                        >
                        <img src='http://resource.zhishimao.cn/images/arrow.png'/>
                        <div className="po_ab">
                            <p className="text_white">分享到好友群或朋友圈</p>
                            <p className="text_match">领取语音外教课</p>
                        </div>
                    </Modal>
                </div>
                <Modal
                    visible={this.state.achieveCourse}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('achieveCourse')}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                <div className="modalWrap">
                    <Icon type={'cross'}  onClick={this.onClose('achieveCourse')}  className="closeModal"/>
                    <h3>知识猫，口袋里的全球英语课堂</h3>
                    <img className="course_qrcode_img" src="http://resource.zhishimao.cn/images/course-qrcode.jpg"/><WhiteSpace/>
                    <p className="text_black text_receive">长按二维码关注，关注知识猫的公众号，回复
                        <span  onClick={this.handleOnClickToast}>
                            <Clipboard data-clipboard-text={this.props.code}  className="text_match">{this.props.code}</Clipboard> 
                        </span>（点击复制），领取语音外教课
                    </p>
                    <div className="text_base">活动规则，坚持每日答题</div>
                </div>
                </Modal>
            </div>
        );
    }  
}

export default AchieveCourse;
