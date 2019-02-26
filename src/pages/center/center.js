import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabBar, AtTabs, AtInput ,AtIcon, AtButton, AtMessage} from 'taro-ui'
import { goLogin, outLogin } from '../../actions/center'
import Tabbar from '../../components/Tabbar/Tabbar'
import moment from 'moment'
import './center.less'
const tabList = [
  { title: '全部', type: 'all'},
  { title: '精华', type: 'good'},
  { title: '分享', type: 'ask'},
  { title: '问答', type: 'share'},
  { title: '招聘', type: 'job'},
]

@connect(({ center }) => ({
    center
}), (dispatch) => ({
  goLogin(params) {
    return dispatch(goLogin(params))
  },
  outLogin(params) {
    return dispatch(outLogin(params))
  },
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
        btnLoading: false
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

  }
  handleChange(value) {
    this.setState({
        accesstoken: value
    });
  }
  async login() {
    const accesstoken = this.state.accesstoken;
    if(accesstoken) {
        this.setState({
            btnLoading: true
        });
        const params = {
            accesstoken
        };
        const data = await this.props.goLogin(params);
        console.log(data,'aaaaaa');
        if(data.success){
            Taro.atMessage({
                'message': '登录成功',
                'type': 'success',
            })
        } else {
            Taro.atMessage({
                'message': data.error_msg,
                'type': 'error',
            })
        }
        this.setState({
            btnLoading: false
        });
    } else {
        Taro.atMessage({
            'message': '请输入accesstoken',
            'type': 'error',
        })
    }
  }

  render () {
    const {userInfo} = this.props.center;
    console.log(this.props);
    return (
      <View className="centerContainer">
        <AtMessage />
        {userInfo ?
        <View>11</View>
        :
        <View className="loginBox">
            <AtInput
                clear
                placeholder='accesstoken'
                value={this.state.accesstoken}
                onChange={this.handleChange.bind(this)}
            />
            <AtButton loading={this.state.btnLoading} onClick={() => this.login()} type='primary'>登录</AtButton>
        </View>

        }
        <Tabbar current={3}/>
      </View>
    )
  }
}

export default Index
