import fetchs from './fetchs';
import {
  http_get_topicList
} from './url';
class Service {
  async getTopicList(params) {
    const url = http_get_topicList();
    console.log('123123123',params)
    const res = await fetchs.GET(url, params);
    return res;
  }
}
export default new Service();
