import ajax from '../../ajax';
function recallMsg () {
    let loginInfo = {
        sdkAppID: '1400023689',
        appIDAt3rd: '1400023689',
        accountType: '8341',
        identifier: '59e59330562af80df36612f5',
        identifierNick: '远方的我房间',
        liveId: '5a165844562af81df4049eda',
        userSig: 'eJxFkF1Pg0AQRf8Lrxrdjy5lTXwg9CNYSmKhjeVlg*yCE4Suy9Zgjf9dJCW*3nMnM2e*nTRK7nKtQYrcCmqk8*Ag53aMVa-BKJGXVpkhxowxgtBEP5Xp4NQOgCDMMKEI-UOQqrVQwjjIuGKcUsRckpcekiV1XUxKdu12UA2l7XIfhM*LaBOppOsbniFY7wsvtYfaqK3Ps3R36eY3lf*k4SXODpsqrBbHPn3v5DlZxTVaGhoEiYaw8tdN-WHfduboXu7r*HVltPc4LZO1GHX-hGbDwYS6Hr9CC40aRTGe8Tlmk01eFKdza4X90mr8z88veeRcuQ__',
    };
    let ss = 'usersig=eJxFkF1PwjAUhv-LbjXaditQEy6qTCC68OGG2W6aZiu1UbpaCmEY-ru1GfHqJM*Tk-O*5yfKX9-uuDGqYdyx2DbRQwSi24DFySgrGN86YT2GGGMEwNUehd2rVnuBAMQQxQD8S9UI7dRWhcV1WZU93yvpQZaunuaP*VLmHw4vbqYomYhRlou2Jjor14vTYHnedDME50Nrvr7fqaJS1cVUEmrLY1YliTlM6H1lZ7ArzuRZE-RiV8UuTTmicjy*Hms*Waj2Fz7x4VA8GJFeOrUToRSECRn60XNe1*1BO*Y6I8IvLr*3TlZW&identifier=59e59330562af80df36612f5&sdkappid=1400023689&random=99999999&contenttype=json';
    let ss1 = `usersig=${loginInfo.userSig}&identifier=${loginInfo.identifier}&sdkappid=1400023689&random=99999999&contenttype=json`;
    let url = 'https://console.tim.qq.com/v4/group_open_http_svc/group_msg_recall?' + ss1;
    let data = {
        'GroupId': '5a165844562af81df4049eda',
        'MsgSeqList': [
            {'MsgSeq': 57},
        ],
    };
    let dataJS = JSON.stringify(data);
    console.log(dataJS);
    ajax.request('post', url, dataJS).then((res) => {
        console.log('消息撤回', res);
    });
}
export {
    recallMsg,
};
