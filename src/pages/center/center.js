import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabs,AtTabsPane, AtInput, AtButton, AtMessage,AtListItem,AtList} from 'taro-ui'
import { goLogin, getUserInfo, outLogin } from '../../actions/center'
import Tabbar from '../../components/Tabbar/Tabbar'
import moment from 'moment'
import './center.scss'

const tabList = [
  { title: '我的话题', type: 'topic'},
  { title: '我的回复', type: 'reply'}
]

@connect(({ center }) => ({
    center
}), (dispatch) => ({
  goLogin(params) {
    return dispatch(goLogin(params))
  },
  getUserInfo(params) {
    return dispatch(getUserInfo(params))
  },
  outLogin(params) {
    return dispatch(outLogin(params))
  },
}))

class Index extends Component {

    config = {
    navigationBarTitleText: '我的'
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
    const {loginInfo} = this.props.center;
    if(loginInfo) {
        const data = await this.props.getUserInfo(loginInfo.loginname);
        console.log(data);
    }
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
        if(data.success){
            Taro.atMessage({
                'message': '登录成功',
                'type': 'success',
            })
            await this.props.getUserInfo(data.loginname);
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
  switchTopic(value) {
    this.setState({
        current: value
    })
  }
  jump(value) {
    Taro.navigateTo({
        url: `/pages/myTopic/myTopic?from=${value}`
    });
  }
  render () {
    console.log(this.props);
    const {loginInfo,userInfo} = this.props.center;
    
    return (
      <View className='centerContainer'>
        <AtMessage />
        {loginInfo ?
        <View>
            {userInfo && 
            <View>
                <View className='mineUserInfo'>
                    <Image className='avatar' src={userInfo.avatar_url} />
                    <View className='center-github-box'>https://github.com/{userInfo.githubUsername}</View>
                    <View className='center-info-box'>
                        <Text >创建于:{moment(userInfo.create_at).format('YYYY-MM-DD')}</Text>
                        <Text className='center-info-text'>积分:{userInfo.score}</Text>
                    </View>
                </View>
                <AtList>
                    <AtListItem
                      title={decodeURI('我发布的话题')}
                      arrow='right'
                      onClick={() => this.jump('creat')}
                      thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                    <AtListItem
                      title={decodeURI('我回复的话题')}
                      arrow='right'
                      onClick={() => this.jump('reply')}
                      thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                    />
                    {/* <AtListItem
                        title={decodeURI('我收藏的话题')}
                        arrow='right'
                        onClick={() => this.jump('collect')}
                        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                    /> */}
                </AtList>
            </View>
            }
        </View>
        :
        <View className='loginBox'>
            <AtInput
              clear
              placeholder='accesstoken'
              value={this.state.accesstoken}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton loading={this.state.btnLoading} onClick={() => this.login()} type='primary'>登录</AtButton>
        </View>

        }
        {process.env.TARO_ENV === 'weapp' ? '' : <Tabbar current={3} />}
        
      </View>
    )
  }
}

export default Index
