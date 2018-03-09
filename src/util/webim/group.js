import webim from './sdk';

/**
 * 创建群组
 * 
 * @param {any} ckOK 
 * @param {any} ckError 
 */
function createGroup (ckOK, ckError) {
    let options = {

    };
    webim.createGroup(options, ckOK, ckError);
}

/**
 * 加入群组
 * 
 * @param {*} ckOK 
 * @param {*} ckError 
 * @param {*} options 
 */
function applyJoinGroup (ckOK, ckError) {
    let options = {};
    webim.applyJoinGroup(options, ckOK, ckError);
}
