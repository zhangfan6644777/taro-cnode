import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabs,AtTabsPane, AtInput, AtButton, AtMessage,AtListItem,AtList} from 'taro-ui'
import { getMessage } from '../../actions/message'
import Tabbar from '../../components/Tabbar/Tabbar'
import moment from 'moment'

@connect(({ message, center }) => ({
    message,center
}), (dispatch) => ({
    getMessage(params) {
    return dispatch(getMessage(params))
  }
}))

class Index extends Component {

    config = {
    navigationBarTitleText: '详情'
  }
  constructor(props) {
    super(props);
    /**
    * 指定config的类型声明为: Taro.Config
    *
    * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
    * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
    * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
    */

    this.state = { 
        accesstoken: '',
        btnLoading: false,
        current: 0
    };
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidMount() {
    this.init()
  }
  async init() {
    console.log(this.props)
    const params = {
        accesstoken: this.props.center.loginInfo.accesstoken
    }
    this.props.getMessage(params);
  }

  async login() {

  }
  render () {
    return (
      <View className="messageContainer">
        message
        <Tabbar current={2}/>
      </View>
    )
  }
}

export default Index
