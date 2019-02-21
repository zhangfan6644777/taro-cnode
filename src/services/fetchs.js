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
      return res.data;
    }
  }
  async GET(url) {
    let resp = await fetch(url, {
      method: 'GET',
      //headers: jsonHeaders()
    });
    let res = await resp.json();
    if (resp.status === 200) {
      return res.data;
    }
  }

}

export default new Fetchs();

