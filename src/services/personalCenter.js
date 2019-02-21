import fetchs from './fetchs';
import {
  http_get_userinfo,
  http_post_accesstoken
} from './url';
class Service {
  async login(params) {
    const url = http_post_accesstoken();
    const res = await fetchs.POST(url, params);
    console.log('res',res);
    return res;
  }
  async getUserInfo(loginname) {
    const url = http_get_userinfo(loginname);
    const res = await fetchs.GET(url);
    console.log('res',res);
    return res;
  }
}
export default new Service();
