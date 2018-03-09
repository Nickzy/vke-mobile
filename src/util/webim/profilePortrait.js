import webim from './sdk';

/**
 * 设置当前用户个人资料
 * @param {*} ckOK 
 * @param {*} ckError 
 */
function setProfilePortrait (ckOK, ckError) {
    let options = {
        'ProfileItem':
        [
            {
                'Tag': 'Tag_Profile_IM_Nick',
                'Value': 'NickName',
            },
            {
                'Tag': 'Tag_Profile_IM_Gender',
                'Value': 'Gender_Type_Male',
            },
            {
                'Tag': 'Tag_Profile_IM_Image',
                'Value': 'http://img.ui.cn/data/file/7/1/9/1486917.jpg',
            },
        ],
    };
    webim.setProfilePortrait(options, ckOK, ckError);
}

/**
 * 获取当前用户个人资料
 * @param {*} ckOK 
 * @param {*} ckError 
 */
function getProfilePortrait (ckOK, ckError) {
    let options = {
        'To_Account': ['Danny'],
        'TagList':
        [
            'Tag_Profile_IM_Nick',
            'Tag_Profile_IM_Gender',
            'Tag_Profile_IM_Image',
        ],
    };
    webim.getProfilePortrait(options, ckOK, ckError);
}

export default {
    setProfilePortrait,
    getProfilePortrait,
};
