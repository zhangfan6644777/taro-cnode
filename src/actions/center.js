import {
    LOGIN,
    OUTLOGIN
  } from '../constants/center'
  import Service from '../services/center';
  export const login = (data) => {
    return {
      type: LOGIN,
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
            dispatch(login(data));
        }
        return data;
    }
  }
  export function outLogin () {
    return dispatch => {
        dispatch(outlogin())
    }
  }
  