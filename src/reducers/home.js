const INITIAL_STATE = {
  topicList: []
}

export default function home (state = INITIAL_STATE, action) {
  console.log('actionactionaction',action)
  switch (action.type) {
    case 'INITLIST':
    return {
      ...state,
      topicList: []
    }
    case 'GETLIST':
      return {
        ...state,
        topicList: [...action.data.data]
      }
    case 'LOADMORE':
      return {
        ...state,
        topicList: [...state.topicList,...action.data.data]
      }
     default:
       return state
  }
}
