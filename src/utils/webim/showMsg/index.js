import {webim} from '../../../utils/webim';
import {convertMsgtoHtml} from '../converMsg';
import store from '../../../store';
import {repMsg, addMsg} from '../../../reducers/message';
import {addMsgDis, repMsgDis} from '../../../reducers/discussMsg';
// 聊天页面增加一条消息
export function showMsg (msg) {
    var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    fromAccountNick = msg.getFromAccountNick();
    if (!fromAccountNick) {
        fromAccountNick = fromAccount;
    }
    isSelfSend = msg.getIsSend();// 消息是否为自己发的
    sessType = msg.getSession().type();
    // 获取消息子类型
    // 会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    // 会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();
    let Msg = null;
    switch (subType) {
        case webim.GROUP_MSG_SUB_TYPE.COMMON:// 群普通消息
            Msg = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET:// 群红包消息
            Msg = '[群红包消息]' + convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG:// 群点赞消息
            // 业务自己可以增加逻辑，比如展示点赞动画效果
            Msg = '[群点赞消息]' + JSON.stringify(convertMsgtoHtml(msg));
            // 展示点赞动画
            // showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP:// 群提示消息
            Msg = '[群提示消息]' + convertMsgtoHtml(msg);
            break;
    }
    let msgId = msg.sess.id();
    let curGroupId = '5a1519e0562af837d8ef3f02';
    let brotherId = '5a165844562af81df4049eda';
    console.log('showmsg', msg.getSession().id());
    console.log('showmsg', Msg);
    msgChange(msgId, curGroupId, brotherId, Msg);

}
function msgChange (msgId, curGroupId, brotherId, Msg) {
    if (curGroupId === '5a1519e0562af837d8ef3f02') {
        msgId === curGroupId && store.dispatch(repMsg(Msg));
        msgId === brotherId && store.dispatch(addMsgDis(Msg));
    } else {
        msgId === curGroupId && store.dispatch(repMsgDis(Msg));
        msgId === brotherId && store.dispatch(addMsg(Msg));
    }
}
