import {webim} from '../../../utils/webim';
import { selToID, loginInfo} from '../webimPublic';

/**
     * 检查用户登录
     * @returns {boolean}
     */
export function checkLogin () {
    if (!loginInfo.identifier) { // 未登录
        if (accountMode == 1) {// 托管模式
            // 将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            // 调用tls登录服务
            tlsLogin();
        } else {// 独立模式
        }
        return false;
    }
    if (!selToID) {
        return false;
    } else {
        return true;
    }
}
function tlsLogin () {
    // 跳转到TLS登录页面
    TLSHelper.goLogin({
        sdkappid: loginInfo.sdkAppID,
        acctype: loginInfo.accountType,
        url: window.location.href,
    });
}
