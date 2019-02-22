const INITIAL_STATE = {
  topicList: []
}

export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INITLIST':
    return {
      ...state,
      topicList: []
    }
    case 'GETLIST':
      state.topicList = [...action.data];
      return {
        ...state,
        topicList: [...action.data]
      }
     default:
       return state
  }
}
