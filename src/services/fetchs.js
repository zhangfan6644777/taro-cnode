import Taro from '@tarojs/taro'
const jsonHeaders = function () {
  return {
    // 'Duliday-Agent': '4',
    // 'Duliday-Agent-Version': 0x020000.toString(),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Duliday-Token': localStorage.getItem('Duliday-Token-manage')
  };
};

class Fetchs {

  async POST(url, params) {
    const resp = await Taro.request(url, {
      method: 'POST',
      credentials: 'include',
      //headers: jsonHeaders(),
      body: JSON.stringify(params)
    });
    if (resp.statusCode === 200) {
      return resp.data;
    }
  }
  async GET(url,params) {
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    let resp = await Taro.request(url, {
      method: 'GET',
      //headers: jsonHeaders()
    });
    console.log(resp);
    if (resp.statusCode === 200) {
      return resp.data;
    }
  }

}

export default new Fetchs();

