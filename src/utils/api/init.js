import ajax from '../ajax';
import {Apis} from '../api/apis';
export function init (cb) {
    let url = Apis.checkAuth;
    console.log(Apis);
    ajax.request('get', url).then((res) => cb(res));
}
