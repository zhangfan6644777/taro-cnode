import Taro, { Component } from '@tarojs/taro'
import { AtTabBar} from 'taro-ui'
export default class Tabbar extends Component {
  constructor (props) {
    super(props)
    this.state = { current: 1 }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    return (
        <AtTabBar
          fixed
          tabList={[
            { title: '拍照', iconType: 'camera' },
            { title: '文件夹', iconType: 'folder'}
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
    )
  }
}