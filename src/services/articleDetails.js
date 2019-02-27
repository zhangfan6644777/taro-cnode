import fetchs from './fetchs';
import {
    http_get_topicDetails,
    http_post_addReply
} from './url';
class Service {
  async getArticleDetail(id) {
    const url = http_get_topicDetails(id);
    const res = await fetchs.GET(url);
    console.log(res);
    return res;
  }
  async addReply({accesstoken,content,id}) {
    const url = http_post_addReply(id);
    const data = {
      accesstoken,
      content
    }
    const res = await fetchs.POST(url,data);
    console.log(res);
    return res;
  }
}
export default new Service();
