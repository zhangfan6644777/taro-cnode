import fetchs from './fetchs';
import {
    http_get_message,
    http_post_markOne
} from './url';
class Service {
  async getMessage(params) {
    const url = http_get_message();
    const res = await fetchs.GET(url, params);
    return res;
  }
  async markOne(params) {
    console.log('param',params)
    const url = http_post_markOne(params.replyId);
    params = {
        accesstoken: params.accesstoken
    }
    const res = await fetchs.POST(url, params);
    return res;
  }
}
export default new Service();
