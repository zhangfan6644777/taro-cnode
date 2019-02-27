import {
    INITDETAIL,
    GETDETAIL
} from '../constants/articleDetails'
import Service from '../services/articleDetails';
export const initDetail = () => {
    return {
        type: INITDETAIL
    }
}
export const getdetail = (data) => {
    return {
        type: GETDETAIL,
        data: data
    }
}
  
// 异步的action
export function getDetail (params) {
    return async dispatch => {
        dispatch(initDetail());
        const data = await Service.getArticleDetail(params);
        dispatch(getdetail(data));
        return data;
    }
}
export function refreshDetail (params) {
    return async dispatch => {
        const data = await Service.getArticleDetail(params);
        dispatch(getdetail(data));
        return data;
    }
}
export function getComments (params) {
    return async dispatch => {
        dispatch(initDetail());
        const data = await Service.getArticleDetail(params);
        dispatch(getdetail(data));
        return data;
    }
}
