import { GETLIST } from '../constants/home'

const INITIAL_STATE = {
  topicList: []
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GETLIST:
      state.topicList = [...action.data];
      return {
        ...state,
        topicList: [...action.data]
      }
     default:
       return state
  }
}
