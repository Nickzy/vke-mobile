import ajax from '../../../utils/ajax';
import {webim} from '../../../utils/webim';
import {imgUrl} from '../../../config/urls';
// 读取群组成员
function getGroupMemberInfo (group_id, cb) {
    let ss = 'usersig=eJxFkFFPgzAUhf8LrzOmLXTZfEM6J0zn2AADL023Fld1UEpdYMb-LjYsvn5fbs4599tJnna3TCnJKTPU1dy5c4BzY7HolNSCstIIPWCIMUYAXO1Z6FbW1SAQgBgiF4B-KbmojCylPdzmRT7yVr4N4HmRB2FMyGpWZUGUqoTcR35TPHQSoM8mzmDWXd7XYHHC56Z-PJa9Hx79iIepbglJ1nHB5mk9battEm-2Oz5JN3y5D14nyxdm4CrU1zD*Qe20v-LeUA6509l8lEaehB0FoecBF*CRs8Oh-qoMNb0S9hc-vw7iVws_&identifier=RYZY&sdkappid=1400023689&random=99999999&contenttype=json';
    let url = 'https://console.tim.qq.com/v4/group_open_http_svc/get_group_member_info?' + ss;
    let data = {
        GroupId: '5a17b273562af83a8888367e',
    };
    var MemberList = null;
    var itemList = null;
    var MemberItemList;
    let itemUrl = 'https://console.tim.qq.com/v4/profile/portrait_get?' + ss;
    let dataJ = JSON.stringify(data);
    ajax.request('post', url, dataJ).then((res) => {
        console.log(res);
        if (res.ActionStatus === 'OK') {
            MemberList = res.MemberList.map((item) => {
                let status = item.NameCard.indexOf('course_other');
                var obj = {};
                if (status === -1) {
                    switch (item.NameCard) {
                        case 'course_interact' :
                            obj = {
                                type: '互动学员',
                            };
                            break;
                        case 'lecturer' :
                            obj = {
                                type: '讲师',
                            };
                            break;
                        case 'course_audit' :
                            obj = {
                                type: '旁听学员',
                            };
                            break;
                    }
                } else {
                    let arr = item.NameCard.split(':');
                    obj = {
                        type: arr[1],
                        status: arr[0],
                    };
                }
                return Object.assign({studentId: item.Member_Account}, obj);
            });
            let listArr = res.MemberList.map((item) => item.Member_Account);
            let dataItem = {
                To_Account: listArr,
                TagList:
                [
                    'Tag_Profile_IM_Nick',
                    'Tag_Profile_IM_Image',
                ],
            };
            let dataJS = JSON.stringify(dataItem);
            ajax.request('post', itemUrl, dataJS).then((res) => {
                console.log(res);
                if (res.ActionStatus === 'OK') {
                    itemList = res.UserProfileItem.map((item) => ({
                        nickName: item.ProfileItem[0].Value,
                        avatar: item.ProfileItem[1].Value.indexOf('http') > -1 ? item.ProfileItem[1].Value : imgUrl + '/' + item.ProfileItem[1].Value,
                    }));
                    console.log('MemberList', itemList);
                    if (MemberList) {
                        MemberItemList = MemberList.map((item, index) => Object.assign({}, item, itemList[index]));
                        console.log('MemberItemList', MemberItemList);
                        cb(MemberItemList);
                    }
                }
            });
        }
    });
}
export {
    getGroupMemberInfo,
};
