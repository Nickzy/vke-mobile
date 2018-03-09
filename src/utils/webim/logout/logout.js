import {webim} from '../../../utils/webim';
// 登出
function logout () {
    // 登出
    webim.logout(
        function (resp) {
            webim.Log.info('登出成功');
            loginInfo.identifier = null;
            loginInfo.userSig = null;
            // var indexUrl = window.location.href;
            // var pos = indexUrl.indexOf('?');
            // if (pos >= 0) {
            //     indexUrl = indexUrl.substring(0, pos);
            // }
            // window.location.href = indexUrl;
        }
    );
}

export {
    logout
}
