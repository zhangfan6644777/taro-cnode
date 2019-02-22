import {GETLIST,INITLIST,LOADMORE} from '../constants/home';

import Service from '../services/home';

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
export const load = (data) => {
  return {
    type: LOADMORE,
    data: data
  }
}
export function getTopicList (params) {
  return async dispatch => {
    const data = await Service.getTopicList(params);
    dispatch(getlist(data));
    return data;
  }
}
export function getMoreTopicList (params) {
  return async dispatch => {
    const data = await Service.getTopicList(params);
    dispatch(load(data))
    return data;
  }
}