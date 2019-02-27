import Taro from '@tarojs/taro'
const INITIAL_STATE = {
    loginInfo: Taro.getStorageSync('loginInfo') || null,
    userInfo: Taro.getStorageSync('userInfo') || null,
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN':
      const loginInfo = Object.assign({}, action.data)
      Taro.setStorage({ key: 'loginInfo', data: loginInfo })
      return {
        ...state,
        loginInfo: loginInfo
      }
      case 'OUTLOGIN':
        Taro.removeStorage({ key: 'loginInfo' })
        return {
          ...state,
          loginInfo: null
        }
        case 'GETMYINFO':
        Taro.setStorage({ key: 'userInfo', data: Object.assign({}, action.data.data) })
        return {
          ...state,
          userInfo: Object.assign({}, action.data.data)
        }
       default:
         return state
    }
  }
  