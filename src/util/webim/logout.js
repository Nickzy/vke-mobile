import webim from './sdk';

/**
 * 退出登录
 */
function logout (ckOK, ckError) {
    // 未完成 判断当前的登陆状态 如果登陆 退出； 如果没有登录， 不进行任操作
    // 推出后跳转到另一个页面
    webim.logout(ckOK, ckError);
}
// 示例代码：
// setTimeout(
//     () => {
//         logout((resp) => {
//             console.warn('退出登录');
//             console.warn(resp);
//         }, (err) => {
//             console.warn('退出失败');
//             console.warn(err.ErrorInfo);
//         });
//     },
//     1000
// );


export default logout;
