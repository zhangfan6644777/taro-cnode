
const INITIAL_STATE = {
    has_read_messages: [],
    hasnot_read_messages: []
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GETMESSAGE':
      return {
        ...state,
        has_read_messages: [...action.data.data.has_read_messages],
        hasnot_read_messages: [...action.data.data.hasnot_read_messages],
      }
     default:
       return state
  }
}
