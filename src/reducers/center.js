const INITIAL_STATE = {
    userInfo: null
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN':
      return {
        ...state,
        userInfo: {
            avatar_url: action.data.avatar_url,
            id: action.data.id,
            loginname: action.data.loginname
        }
      }
      case 'OUTLOGIN':
        return {
          ...state,
          userInfo: null
        }
       default:
         return state
    }
  }
  