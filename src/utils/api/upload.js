import wx from 'weixin-js-sdk';
import {sendMsg} from '../webim/sendMessage';
import {uploadImgUrl} from '../../config/urls';
import ajax from '../ajax';
import {getSign} from '../api/index';
const browserMD5File = require('browser-md5-file');

/**
 * 上传图片
 * @param {*} file 图片的file
 */
function upload (file) {
    file = file || '';
    Ismobile() && wxChooseImg();
    Ismobile() || selfUploadImg(file);
}

/**
 * 检测是否为移动端
 */
function Ismobile () {
    let browser = {
        versions: (function () {
            let u = navigator.userAgent, app = navigator.appVersion;
            console.log(u);
            return {
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            };
        }()),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    };
    console.log('是否为移动端' + browser.versions.mobile);
    return browser.versions.mobile;
}

/**
 * 微信上传图片方法
 */
function wxChooseImg () {
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
                localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    sendMsg.sendImageMsg({
                        id: serverId,
                        type: 'image',
                    });
                },
            });
        },
    });
}

/**
 * 微信预览图片方法
 * @param {*} e
 */
function wxPreviewImg (e) {
    if (e.target.tagName.toUpperCase() != 'IMG') {
        return false;
    }
    var url = e.target.getAttribute('src');
    wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url], // 需要预览的图片http链接列表
    });
}

function selfUploadImg (file) {
    getSign((res) => md5(res, file));
}
function md5 (sign, file) {
    const formData = new FormData();
    browserMD5File(file, function (err, md5) {
        if (!file.type.match('image.*')) {
            console.log('请上传图片');
        } else {
            formData.append('op', 'upload');
            formData.append('fileContent', file);
            let filecontent = formData;
            let url = uploadImgUrl + '/' + md5 + '?sign=' + sign;
            ajax.request('post', url, filecontent).then((res) => {
                if (res.message === 'SUCCESS') {
                    sendMsg.sendImageMsg({
                        type: 'image',
                        id: md5,
                    });
                }
            });
        }
    });
}
export {
    // wxChooseImg,
    Ismobile,
    upload,
    selfUploadImg,
};
