import Taro from '@tarojs/taro'
const jsonHeaders = function () {
  return {
    // 'Duliday-Agent': '4',
    // 'Duliday-Agent-Version': 0x020000.toString(),
    'accept': 'application/json, text/plain, */*',
    'content-type': 'application/json;charset=UTF-8',
    // 'Duliday-Token': localStorage.getItem('Duliday-Token-manage')
  };
};

class Fetchs {

  async POST(url, params) {
    const resp = await Taro.request({
      url,
      method: 'POST',
      //credentials: 'include',
      header: jsonHeaders(),
      data: JSON.stringify(params)
    });
    return resp.data;
    // if (resp.statusCode === 200) {
    //   return resp.data;
    // } 
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
    let resp = await Taro.request({
      url,
      method: 'GET',
      //header: jsonHeaders()
    });
    console.log(resp);
    return resp.data;
    // if (resp.statusCode === 200) {
    //   return resp.data;
    // }
  }

}

export default new Fetchs();

