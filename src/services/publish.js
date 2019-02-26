import fetchs from './fetchs';
import {
    http_post_creatTopic
} from './url';
class Service {
  async creatTopic(params) {
    const url = http_post_creatTopic();
    console.log('123123123',params)
    const res = await fetchs.POST(url, params);
    return res;
  }
}
export default new Service();
