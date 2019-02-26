import Taro, { Component } from '@tarojs/taro'
import { AtTabBar} from 'taro-ui'
const tabList = [
  { title: '主页', iconType: 'home', router: 'index'},
  { title: '发布', iconType: 'add', router: 'publish'},
  { title: '消息', iconType: 'message', router: 'message'},
  { title: '我的', iconType: 'user', router: 'center'}
]
export default class Tabbar extends Component {
  constructor (props) {
    super(props)
  }
  handleClick (value) {
    const router = tabList[value].router
    if(process.env.TARO_ENV === 'h5'){
      Taro.redirectTo({
        url: `/pages/${router}/${router}`
      });
    } else {
      Taro.switchTab({
        url: `/pages/${router}/${router}`
      });
    }
  }
  render () {
    return (
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
          current={this.props.current}
        />
    )
  }
}