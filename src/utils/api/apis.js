import {apiUrl} from '../../config/urls';
let HOST_URL = apiUrl;
let Apis = {
    // 首页
    home: '/h5/v1/home',
    // 讲师列表
    lecturer: '/h5/v1/lecturer',
    // 不同分类课程
    category: '/h5/v1/category',
    // 搜索课程或讲师
    homeSearch: '/h5/v1/home',
    // 检查授权以及用户信息
    checkAuth: '/h5/v1/auth',
    // 生成二维码
    qrcode: '/h5/v1/qrcode',
    // 获取微信签名
    wxConfig: '/h5/v1/live/wxConfig',
    // 进入直播间
    joinLive: '/h5/v1/live/',
    // 报名学员列表
    studentList: '/h5/v1/live/student',
    // 提现申请
    withDraw: '/h5/v1/order/withDraw',
    // 订单取消
    cancel: '/h5/v1/order/cancel',
    // 赞赏消息微信预支付
    admire: '/h5/v1/order/admire',
    // 课程预支付
    coursePlay: '/h5/v1/order/courses',
    // 微信支付成功回调
    succPlay: '/h5/v1/order/succ',
    // 分享课程
    courseShare: '/h5/v1/course/share/',
    // 获取sign值
    sign: '/h5/v1/file/cosSingleSign',
    // 课程收藏
    courseCollect: '/h5/v1/course/collect/',
    // 课程结束或删除或详情或修改
    courseChanges: '/h5/v1/course',
    // 课程上下架
    courseShelf: '/h5/v1/course/shelf/',
    // 课程评价
    courseEvaluate: '/h5/v1/course/evaluate/',
    // 是否订阅讲师
    courseSubscribe: '/h5/v1/course/subscribe?',
    // 课程收益
    courseEarnings: '/h5/v1/course/earnings/',
    // 课程评价
    courseFeedBack: '/h5/v1/course/feedBack/',
    // 课程预支付订单
    order: '/h5/v1/order/courses',
    // 获取当日问题
    questions: '/h5/v1/questions',
    // 分享类接口
    shares: '/h5/v1/share',
};
for (var api in Apis) {
    Apis[api] = HOST_URL + Apis[api];
}
export { Apis };

