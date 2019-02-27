import {
    GETMESSAGE
} from '../constants/message'
import Service from '../services/message';
export const getmessage = (data) => {
    return {
        type: GETMESSAGE,
        data: data
    }
}

  
// 异步的action
export function getMessage (params) {
    return async dispatch => {
        const data = await Service.getMessage(params);
        dispatch(getmessage(data));
        return data;
    }
}

export function markAll (params) {
    return async dispatch => {
        await Service.markAll(params);
        const data = await Service.getMessage(params);
        dispatch(getmessage(data));
        return data;
    }
}
