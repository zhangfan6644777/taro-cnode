import fetchs from './fetchs';
import {
  http_post_accesstoken,
  http_get_userinfo
} from './url';
class Service {
  async goLogin(params) {
    const url = http_post_accesstoken();
    console.log('url',url)
    const res = await fetchs.POST(url, params);
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
