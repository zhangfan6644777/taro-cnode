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
    const resp = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      //headers: jsonHeaders(),
      body: JSON.stringify(params)
    });
    let res = await resp.json();
    if (resp.status === 200) {
      return res;
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
    let resp = await fetch(url, {
      method: 'GET',
      //headers: jsonHeaders()
    });
    let res = await resp.json();
    console.log('rererere',res)
    if (resp.status === 200) {
      return res;
    }
  }

}

export default new Fetchs();

