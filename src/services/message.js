import fetchs from './fetchs';
import {
    http_get_message
} from './url';
class Service {
  async getMessage(params) {
    const url = http_get_message();
    const res = await fetchs.GET(url, params);
    return res;
  }
}
export default new Service();
