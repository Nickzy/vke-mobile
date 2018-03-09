import ajax from '../ajax';
import {Apis} from '../api/apis';
import store from '../../store';
import {courseInit, collectCourse, overCourse} from '../../reducers/courseItem';
import {allCourse, categoryList} from '../../reducers/course';
import {getFirstLecturer} from '../../reducers/lecturerList';
import wx from 'weixin-js-sdk';
import {apiUrl, imgUrl} from '../../config/urls';
import {webimPublic} from '../webim/webimPublic';

function joinLive (opt, cb) {
    let url = Apis.joinLive + opt.id + '?balance=' + opt.balance;
    ajax.request('get', url).then((res) => cb(res));
}
function DeleteMsg (opt, cb) {
    let url = Apis.joinLive + opt.id + '?msgSeq' + opt.msgSeq + '&type=' + opt.type;
    ajax.request('delete', url).then((res) => cb(res));
}
function studentList (opt, cb) {
    let url = Apis.studentList + '?type=' + opt.type + '&courseId=' + opt.courseId;
    ajax.request('put', url).then((res) => cb(res));
}
function getSign (cb) {
    let url = Apis.sign;
    ajax.request('get', url).then((res) => {
        let sign = encodeURIComponent(res.data.sign);
        cb(sign);
    });
}
let userId = null;
function isAuth () {
    let url = `${apiUrl}/auth`;
    let isShared = window.location.href.split('shareId=')[1];
    let shareId = '';
    if (isShared) {
        shareId = `?shareId=${window.location.href.split('shareId=')[1]}`;
    }
    ajax.request('get', url).then((res) => {
        console.log(res);
        console.log(window.location.href.split('/')[3]);
        if (res.actionStatus) {
            userId = res.data.user.idStr;
            if (res.data && !res.data.user) {
                let uri = window.location.href.split('/')[3];
                console.log('地址栏1' + window.location.href);
                window.location.href = `${apiUrl}/h5/v1/question${shareId}`;
            }
        } else {
            let uri = window.location.href.split('/')[3];
            console.log('地址栏2' + window.location.href);
            console.log('地址栏3' + `${apiUrl}/h5/v1/question${shareId}`);

            window.location.href = `${apiUrl}/h5/v1/question${shareId}`;
        }
    });
}


/**
 * 课程收藏
 * @param {object} opt 参数object
 * @param {function，回调函数} cb 回调函数
 */
function courseCollect (opt) {
    let url = `${Apis.courseCollect + opt.courseId}?isCollect=${opt.isCollect}`;
    ajax.request('get', url).then((res) => {
        if (res.actionStatus) {
            store.dispatch(collectCourse(opt.isCollect));
        }
    });
}

/**
 * 课程详情
 * @param {*} opt
 * @param {*} cb
 */
function courseItem (opt, cb) {
    let url = `${Apis.courseChanges}/${opt.courseId}`;
    ajax.request('get', url).then((res) => {
        if (res.actionStatus) {
            store.dispatch(courseInit(res.data));
        }
        cb(res);
    });
}

/**
 * 课程收益
 * @param {*} opt
 * @param {*} cb
 */
function courseEarnings (opt, cb) {
    let url = `${Apis.courseEarnings + opt.courseId}?lecturerId=${opt.lecturerId}`;
    ajax.request('get', url).then((res) => {
        cb(res);
    });
}

/**
 * 课程评价
 * @param {*} opt
 * @param {*} cb
 */
function courseEvaluate (opt, cb) {
    let url = `${Apis.courseEvaluate + opt.courseId}?course=${opt.courseStar}&lecture=${opt.lecturerStar}&content=${opt.content}`;
    ajax.request('post', url).then((res) => {
        cb(res);
    });
}

/**
 * 课程结束
 * @param {*} opt
 * @param {*} cb
 */
function courseOver (opt, cb) {
    let url = `${Apis.courseChanges}/${opt.courseId}`;
    ajax.request('post', url).then((res) => {
        if (res.actionStatus) {
            store.dispatch(overCourse());
        }
        cb(res);
    });
}

/**
 * 课程赞赏
 * @param {*} opt
 * @param {*} cb
 */
function courseAdmire (opt, cb) {
    let url = `${Apis.admire}?courseId=${opt.courseId}&toUid=${opt.lecturerId}&price=${opt.price}&body=知识猫&remark`;
    ajax.request('get', url).then((res) => {
        cb(res);
    });
}

/**
 * 升级互动生
 * @param {*} opt
 * @param {*} cb
 */
function auditUpdate (opt, cb) {
    let url = `${Apis.order}?courseId=${opt.courseId}&type=course_upgrade&price=${opt.price}&remark=`;
    ajax.request('post', url).then((res) => {
        cb(res);
    });
}

/**
 * 旁听生报名
 * @param {*} opt
 * @param {*} cb
 */
function auditBuy (opt, cb) {
    let url = `${Apis.order}?courseId=${opt.courseId}&type=course_audit&price=${opt.price}&remark=`;
    ajax.request('post', url).then((res) => {
        cb(res);
    });
}

/**
 * 互动生报名
 * @param {*} opt
 * @param {*} cb
 */
function interactBuy (opt, cb) {
    let url = `${Apis.order}?courseId=${opt.courseId}&type=course_interact&price=${opt.price}&remark=`;
    ajax.request('post', url).then((res) => {
        cb(res);
    });
}

/**
 * 获取当日问题
 * @param {*} cb
 */
function questions (cb) {
    let url = `${Apis.questions}`;
    ajax.request('get', url).then((res) => {
        cb(res);
    });
}

/**
 * 学员进行问题回答
 * @param {*} questionId
 * @param {*} option //选中的选项
 * @param {*} cb
 */
function answer (questionId, option, cb) {
    let url = `${Apis.questions}/${questionId}?chose=${option}`;
    ajax.request('post', url).then((res) => {
        cb(res);
    });
}

/**
 * 查询今日打卡用户列表
 * @param {*} cb
 */
function dakaRankList (cb) {
    let url = `${Apis.questions}`;
    ajax.request('post', url).then((res) => {
        cb(res);
    });
}

/**
 * 查询用户的答题数据
 * @param {*} userId //questionId
 * @param {*} cb
 * @param {*} shareId
 */
function myDaka (userId, shareId, cb) {
    let url = `${Apis.questions}/${userId}?shareId=${shareId}`;
    if (shareId) {
        url = `${Apis.questions}/${userId}?shareId=${shareId}`;
    } else {
        url = `${Apis.questions}/${userId}`;
    }
    ajax.request('get', url).then((res) => {
        cb(res);
    });
}

function lecturerList (size, index) {
    size = size || 20;
    index = index || 1;
    let url = `${Apis.lecturer}?pageSize=${size}&pageIndex=${index}`;
    ajax.request('get', url).then((res) => {
        console.log('讲师列表数据返回', res);
        if (res.actionStatus) {
            store.dispatch(getFirstLecturer(res.data));
        }
    });
}
function homeItem () {
    let url = `${Apis.home}`;
    ajax.request('get', url).then((res) => {
        console.log(res);
        if (res.actionStatus) {
            store.dispatch(allCourse(res.data));
        }
    });
}
function categoryCourse (id, type, size, index) {
    type = type || '';
    size = size || 20;
    index = index || 1;
    let url = `${Apis.category}/${id}?label=${type}`;
    ajax.request('get', url).then((res) => {
        console.log(res);
        if (res.actionStatus) {
            store.dispatch(categoryList(res.data));
        }
    });
}
function wxConfig (opt, cb) {
    let acturl = encodeURIComponent(window.location.href)
    let url = `${Apis.wxConfig}?acturl=${acturl}`;
    ajax.request('post', url).then((res) => {
        if (res.actionStatus) {
            res = res.data;
            console.log('wxconfig开启微信授权', res);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端toastit出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appid, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.signature, // 必填，签名，见附录1
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'hideMenuItems', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData'],
            });
            wx.ready(() => {
                wx.error((err) => {
                    console.log('授权失败返回错误信息', err);
                });
                wx.checkJsApi({
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareTimeline'], // 需要检测的JS接口列表
                    success: function (res) {
                        console.log('检测的JS接口列表成功', res);
                    },
                    fail: function (res) {
                        console.log('检测微信接口列表失败', res);
                    },
                });
                if (cb) {
                    wxShareAjax(opt, cb);
                } else {
                    wxShareAjax(opt);
                }
            });
        }
    });
}
function wxShareAjax (opt, cb) {
    // let url = `${Apis.shares}?shareUrl=${window.location.href}`;
    let link = `${location.protocol}//${location.hostname}/h5/v1/question/?shareId=${userId}`;
    let enLink = encodeURIComponent(link)
    let url = `${Apis.shares}?shareUrl=${enLink}`;

    ajax.request('get', url).then((res) => {
        let status = window.location.href.indexOf('shareId') > -1;
        console.log('用户ID'+userId);
        console.log('链接'+link);
        if (opt) {
            opt = { ...opt, link: link }
        } else {
            opt = { link: link}
        }    
        if (res.actionStatus) {
            if (cb) {
                wxShare(opt, cb);
            } else {
                wxShare(opt);
            }
        } else {
            if (cb) {
                wxShare(opt, cb);
            } else {
                wxShare(opt);
            }
        }// add
    });
}
let shareObj = {
    title: '答题领取外教课',
    desc: '快来和我一起答题领取外教课吧',
};
function wxShare (opt, cb) {
    wx.onMenuShareTimeline({
        title: `${shareObj.title}【知识猫】`, // 分享标题
        desc: `${opt.desc && `我今天击败了${opt.desc}的朋友,` || ''}${shareObj.desc}`, // 分享描述
        link: `${opt.link}`, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: `${imgUrl}/c89457edab8589b6d1a026c6679d548f?imageView2/1/w/300/h/300`, // 分享图标
        success: function (res) {
            // 用户确认分享后执行的回调函数
            // console.warn('分享朋友圈成功' + JSON.stringify(res));
            if (cb) {
                cb(res);
            }
        },
        cancel: function (err) {
            // 用户取消分享后执行的回调函数
            // console.warn('分享朋友圈失败' + JSON.stringify(err));
            if (cb) {
                cb(err);
            }
        },
    });
    wx.onMenuShareAppMessage({
        title: `${shareObj.title}【知识猫】`, // 分享标题
        desc: `${opt.desc && `我今天击败了${opt.desc}的朋友,` || ''}${shareObj.desc}`, // 分享描述
        link: `${opt.link}`, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: `${imgUrl}/c89457edab8589b6d1a026c6679d548f?imageView2/1/w/300/h/300`, // 分享图标
        success: function (res) {
            // 用户确认分享后执行的回调函数
            // console.warn('分享朋友成功' + JSON.stringify(res));
            if (cb) {
                cb(res);
            }
        },
        cancel: function (err) {
            // 用户取消分享后执行的回调函数
            // console.warn('分享朋友失败' + JSON.stringify(err));
            if (cb) {
                cb(err);
            }
        },
    });
}
function LiveInit () {
    let url = Apis.joinLive + '59fa8d4854525b2def0b0d04';

}
function webimInit () {
    let url = 'http://123.207.143.44:8080/h5/v1/live';
    ajax.request('post', url).then((res) => {
        console.log(res);
        if (res.actionStatus) {
            webimPublic.setLoginInfo(res.data);
            console.log('初始化成功', res);
        } else {
            console.log('初始化失败');
        }
        // cb(res);
    });
}
function courseShare (id) {
    let url = Apis.courseShare + '59fa8d4854525b2def0b0d04';
    ajax.request('get', url).then((res) => {
        console.log(res);
    });
}
export {
    joinLive,
    DeleteMsg,
    studentList,
    wxConfig,
    courseShare,
    webimInit,
    getSign,
    courseCollect,
    courseItem,
    courseEarnings,
    courseEvaluate,
    courseOver,
    courseAdmire,
    auditUpdate,
    auditBuy,
    interactBuy,
    homeItem,
    categoryCourse,
    lecturerList,
    questions,
    answer,
    dakaRankList,
    myDaka,
    isAuth,
};
