const INITIAL_STATE = {
    detail: null
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'INITDETAIL':
      return {
        ...state,
        detail: null
      }
      case 'GETDETAIL':
        return {
          ...state,
          detail: Object.assign({},action.data.data)
        }
      case 'LOADMORE':
        return {
          ...state,
          detail: {}
        }
       default:
         return state
    }
  }
  