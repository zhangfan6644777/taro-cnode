import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabs,AtTabsPane, AtInput, AtButton, AtMessage,AtListItem,AtList} from 'taro-ui'
import { getMessage, markAll } from '../../actions/message'
import Tabbar from '../../components/Tabbar/Tabbar'
import moment from 'moment'
import Service from '../../services/message'
import './message.less'
const tabList = [
    { title: '已读消息', array: 'has_read_messages'},
    { title: '未读消息', array: 'hasnot_read_messages'}
  ]
@connect(({ message, center }) => ({
    message,center
}), (dispatch) => ({
    getMessage(params) {
        return dispatch(getMessage(params))
    },
    markAll(params) {
        return dispatch(markAll(params))
    }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '消息'
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
    const {loginInfo} = this.props.center;
    if(loginInfo) {
      const params = {
        accesstoken: loginInfo.accesstoken
      }
    this.props.getMessage(params);
    }
  }

  async goLogin() {
    if(process.env.TARO_ENV === 'h5'){
        Taro.redirectTo({
          url: `/pages/center/center`
        });
      } else {
        Taro.switchTab({
          url: `/pages/center/center`
        });
      }
  }
  handleClick(value) {
    this.setState({
        current: value
    });
    // if(value === 1 && this.props.message.hasnot_read_messages.length !== 0) {
    //     this.markAll();
    // }
  }
  getcontent(html_str) {
    var re = new RegExp('<[^<>]+>','g');
    var text = html_str.replace(/<[^<>]+>/g,"");
    console.log('text',text)
    return text;
  }
  async jump(topicId,replyId) {
    if(this.state.current === 1) {
        const params = {
            accesstoken: this.props.center.loginInfo.accesstoken,
            replyId
        }
        await Service.markOne(params)
    }
    Taro.navigateTo({
        url: `/pages/articleDetails/articleDetails?id=${topicId}`
    });
  }
  markAll() {
    const params = {
        accesstoken: this.props.center.loginInfo.accesstoken
    }
    this.props.markAll(params);
  }
  render () {
    const {loginInfo} = this.props.center;
    const {message} = this.props;
    const listArray = this.state.current === 0 ? message.has_read_messages : message.hasnot_read_messages
    return (
      <View className="messageContainer">
        {loginInfo ?
        <AtTabs 
        animated={false}
        swipeable={false}
        current={this.state.current}
        tabList={tabList} 
        onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
            {message.has_read_messages.length !== 0 ? message.has_read_messages.map((item,keys) => {
                return <
                AtListItem
                key={keys}
                note={decodeURI(`来自${item.topic.title}`)}
                title={this.getcontent(item.reply.content)}
                arrow='right'
                extraText={moment(item.last_reply_at).format("YYYY-MM-DD")}
                onClick={() => this.jump(item.topic.id,item.id)}
                thumb={item.author.avatar_url}
            />
            })
            :
            <View className="nodata">暂无数据</View>
            }
        </AtTabsPane>

        <AtTabsPane current={this.state.current} index={1} >
            {message.hasnot_read_messages.length !== 0 ? message.hasnot_read_messages.map((item,keys) => {
                return <
                AtListItem
                key={keys}
                note={decodeURI(`来自${item.topic.title}`)}
                title={this.getcontent(item.reply.content)}
                arrow='right'
                extraText={moment(item.last_reply_at).format("YYYY-MM-DD")}
                onClick={() => this.jump(item.topic.id,item.id)}
                thumb={item.author.avatar_url}
            />
            })
            :
            <View className="nodata">暂无数据</View>
            }
        </AtTabsPane>
        </AtTabs>
        :
        <View className="loginTip">请先<Text onClick={this.goLogin.bind(this)} className="login-text">登录</Text>在操作</View>
        }
        {process.env.TARO_ENV === 'weapp' ? '' : <Tabbar current={2}/>}
      </View>
    )
  }
}

export default Index
