import fetchs from './fetchs';
import {
    http_get_topicDetails
} from './url';
class Service {
  async getArticleDetail(id) {
    const url = http_get_topicDetails(id);
    const res = await fetchs.GET(url);
    console.log(res);
    return res;
  }
}
export default new Service();
