import fetchs from './fetchs';
import {
  http_post_accesstoken
} from './url';
class Service {
  async goLogin(params) {
    const url = http_post_accesstoken();
    console.log('url',url)
    const res = await fetchs.POST(url, params);
    return res;
  }
}
export default new Service();
