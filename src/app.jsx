import '@tarojs/async-await'
import 'taro-ui/dist/style/index.scss'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import { View, Button, Text } from '@tarojs/components'
import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/articleDetails/articleDetails',
      'pages/center/center',
      'pages/message/message',
      'pages/publish/publish',
      'pages/myTopic/myTopic'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: '#fff',
      selectedColor: '#6190E8',
      list: [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "./assert/home.png",
          "selectedIconPath": "./assert/home_select.png",
        },
        {
          "pagePath": 'pages/publish/publish',
          "text": "发布",
          "iconPath": "./assert/icon_add.png",
          "selectedIconPath": "./assert/icon_add_select.png",  
        },
        {
          "pagePath": 'pages/message/message',
          "text": "消息",
          "iconPath": "./assert/icon_community_line.png",
          "selectedIconPath": "./assert/icon_community_line_select.png", 
        },
        {
          "pagePath": 'pages/center/center',
          "text": "我的",
          "iconPath": "./assert/icon_signal.png",
          "selectedIconPath": "./assert/icon_signal_select.png",
        }
      ]
    },

  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
