import {GETLIST,INITLIST} from '../constants/home';

import Service from '../services/home'

export const getlist = (data) => {
    return {
      type: GETLIST,
      data: data
    }
}
export const initlist = (data) => {
  return {
    type: INITLIST
  }
}
export function getTopicList (params) {
    return async dispatch => {
      console.log('params',params)
      const data = await Service.getTopicList(params);
      console.log(data,'data');
      dispatch(getlist(data))
    }
}