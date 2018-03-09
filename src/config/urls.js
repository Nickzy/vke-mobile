// vconsole即debug
// noauth、online、offline
// dev prod
// hot

// prod - 生产环境、知识猫线上接口、压缩、去除console和增加debug
// dev - 测试环境、知识猫口语线上部署、压缩、去除console和增加debug 增加一个api的接口模式noauth/online/offline
// hot - 研发环境、加一个api的接口模式 noauth/online/offline

// mode=online npm run hot
// mode=online npm run dev
// npm run prod

let apiUrl, imgUrl, voiceUrl, resourceUrl, uploadImgUrl, rankUrl, media;
if (IS_PRODUCTION) {
    // 这是添加知识猫的Url
    apiUrl = 'http://api.zhishimao.cn';
    imgUrl = 'http://img1.zhishimao.cn';
    voiceUrl = 'http://media.zhishimao.cn';
    uploadImgUrl = 'http://sh.file.myqcloud.com/files/v2/1252848614/img';
    rankUrl = 'http://h5.zhishimao.cn/h5/v1/question/';
    media = 'http://media.zhishimao.cn/';
}

if (IS_DEVELOPMENT) {
    // 这里添加知识猫口语的url
    apiUrl = 'http://api2.zhishimao.cn';
    imgUrl = 'http://img2.zhishimao.cn';
    voiceUrl = 'http://media2.zhishimao.cn';
    uploadImgUrl = 'http://sh.file.myqcloud.com/files/v2/1252848614/img2';
    rankUrl = 'http://h52.zhishimao.cn/h5/v1/question/';
    media = 'http://media2.zhishimao.cn/';
    if (IS_ONLINE) {
        // 这是添加线上的授权的api url
        apiUrl = 'http://api2.zhishimao.cn';
    }
    if (IS_OFFLINE) {
        // 这里添加线下的api url
        apiUrl = 'http://192.168.31.111:8080';
    }
    if (!IS_AUTH) {
        // 这里添加线上未授权的api url
        apiUrl = 'http://123.207.143.44:8080';
    }
}

export {
    apiUrl,
    imgUrl,
    voiceUrl,
    uploadImgUrl,
    rankUrl,
    media,
};
