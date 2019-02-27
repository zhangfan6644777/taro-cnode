import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabTexte, AtActivityIndicator,AtIcon,AtForm,AtTextarea,AtButton,AtMessage} from 'taro-ui'
import { getDetail, refreshDetail } from '../../actions/articleDetails'
import Tabbar from '../../components/Tabbar/Tabbar'
import TabItem from '../../components/TopicItem/TopicItem'
import moment from 'moment'
import Service from '../../services/articleDetails'
import './articleDetails.less'
const tabList = [
  { title: '全部', type: 'all'},
  { title: '精华', type: 'good'},
  { title: '分享', type: 'ask'},
  { title: '问答', type: 'share'},
  { title: '招聘', type: 'job'},
]

@connect(({ articleDetails,center }) => ({
    articleDetails,center
}), (dispatch) => ({
  getDetail(params) {
    return dispatch(getDetail(params))
  },
  refreshDetail(params) {
    return dispatch(refreshDetail(params))
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

    this.params = {
      limit: 10,
      page: 1,
      tab: tabList[0].type
    };
    this.state = { 
      current: 0,//current tab
      status: 'more',// loadmore status
      loading: true,//loading status
      contentValue: ''
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
    const {id} = this.$router.params
    this.props.getDetail(id);
    this.setState({
      loading: false
    });
  }
  getTab(top,good,tab) {
    if (top) {
      return '置顶';
    } else if (good) {
      return '精华';
    } else {
      const tabArray = {
        'ask': '问答',
        'share': '分享',
        'job': '招聘'
      };
      return tabArray[tab];
    }
  }
  async loadmore() {
    this.setState({
      status: 'loading'
    });
    this.params.page++;
    const data = await this.props.getMoreTopicList(this.params);
    if(data.data.length === 0) {
      this.setState({
        status: 'noMore'
      });
    } else {
      this.setState({
        status: 'more'
      });
    }
  }
  changeContent(event) {
    this.setState({
      'contentValue': event.target.value
    })
  }
  async onSubmit() {
    const params = {
      accesstoken: this.props.center.loginInfo.accesstoken,
      content: this.state.contentValue,
      id: this.$router.params.id
    }
    const data = await Service.addReply(params);
    if(data.success){
        Taro.atMessage({
            'message': '评论成功',
            'type': 'success',
        });
        this.setState({
          contentValue: ''
        });
        const {id} = this.$router.params;
        this.props.refreshDetail(id);
        //await this.props.getUserInfo(data.loginname);
    } else {
        Taro.atMessage({
            'message': data.error_msg,
            'type': 'error',
        })
    }
    
  }
  goLogin() {
    Taro.navigateTo({
      url: `/pages/center/center`
    });
  }
  render () {
    const {detail} = this.props.articleDetails;
    const {loginInfo} = this.props.center
    return (
      <View className="topicDetailContainer">
        <AtMessage />
        {detail ?
        <View>
          <section className="title">
            <h3>{detail.title}</h3>
          </section>
          <View className="authorInfo">
            <Image className="avatur" src={detail.author.avatar_url}/>
            <View className="authorInfo-text-box">
              <View className="authorInfo-text authorInfo-text-first"><Text>{detail.author.loginname}</Text><Text className="authorInfo-text-second"><Text>{this.getTab(detail.top,detail.good,detail.tab)}</Text></Text></View>
              <View className="authorInfo-text"><Text>发布于{moment(detail.create_at).format('YYYY-MM-DD')}</Text><Text>{detail.visit_count}次浏览</Text></View>
            </View>
          </View>
          <View className="markdown-body topic-content" dangerouslySetInnerHTML={{ __html: detail.content }} />
          <section className="commentTitle">
            <h3>{detail.reply_count}回复</h3>
          </section>
          <View className="commentList">
          {detail.replies.map((item,key) => {
            return(<View className="commentItem">
              <View className="commentInfo">
                <Image className="replyerAvatur" src={item.author.avatar_url}/>
                <View className="replyer-text-box"><Text className="replyer-text">{item.author.loginname}</Text><Text>{key+1}楼</Text></View>
              </View>
              <View className="markdown-body topic-content" dangerouslySetInnerHTML={{ __html: item.content }} />
              <View className="commentBottom">
                <Text className="replyer-text-time">{moment(item.create_at).format('YYYY-MM-DD')}</Text>
                <View className="good-box">
                {this.state.login ?
                <Text className="good-text">
                <AtIcon value='heart' size='20' color='#707070'></AtIcon>
                {item.ups.length}
                <AtIcon value='message' size='20' color='#707070'></AtIcon>
                </Text>
                :
                  <Text className="good-text">
                  <AtIcon value='message' size='20' color='#707070'></AtIcon>
                  </Text>
                }

                </View>
              </View>
            </View>)
          })}
          {loginInfo ?
            <AtForm
              className="form"
            >
              <AtTextarea
                className="contentInput"
                value={this.state.contentValue}
                onChange={this.changeContent.bind(this)}
                maxLength={200}
                placeholder={decodeURI('请输入回复内容')}
              />
              <AtButton type='primary' className="submitBtn" onClick={() => this.onSubmit()}>评论</AtButton>
            </AtForm>
            :
            <View className="loginTip">请先<Text onClick={this.goLogin.bind(this)} className="login-text">登录</Text>在操作</View>
            }
          </View>
        </View>
        : null}
      </View>

    )
  }
}

export default Index
