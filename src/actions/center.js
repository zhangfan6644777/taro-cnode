import {
    LOGIN,
    OUTLOGIN,
    GETMYINFO
  } from '../constants/center'
  import Service from '../services/center';
  export const login = (data) => {
    return {
      type: LOGIN,
      data: data
    }
  }
  export const getuserinfo = (data) => {
    return {
      type: GETMYINFO,
      data: data
    }
  }
  export const outlogin = () => {
    return {
      type: OUTLOGIN
    }
  }
  
  // 异步的action
  export function goLogin (params) {
    return async dispatch => {
        console.log(params,'params')
        const data = await Service.goLogin(params);
        console.log(data,'asdasdasd')
        if(data.success) {
            data.accesstoken = params.accesstoken;
            dispatch(login(data));
        }
        return data;
    }
  }
  export function getUserInfo (params) {
    return async dispatch => {
        const data = await Service.getUserInfo(params);
        console.log(data,'asdasdasd')
        if(data.success) {
            dispatch(getuserinfo(data));
        }
        return data;
    }
  }
  export function outLogin () {
    return dispatch => {
        dispatch(outlogin())
    }
  }
  