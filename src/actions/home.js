import {GETLIST} from '../constants/home';

import Service from '../services/home'

export const getlist = (data) => {
    return {
      type: GETLIST,
      data: data
    }
}
export function getTopicList (data) {
    return async dispatch => {
      const data = await Service.getTopicList(data);
      console.log(data,'data');
      dispatch(getlist(data))
    }
}