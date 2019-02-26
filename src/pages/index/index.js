import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.less'

import { AtTabBar, AtTabs, AtTabsPane, AtLoadMore, AtActivityIndicator} from 'taro-ui'
import { getTopicList, initlist, getMoreTopicList } from '../../actions/home'
import Tabbar from '../../components/Tabbar/Tabbar'
import TabItem from '../../components/TopicItem/TopicItem'

const tabList = [
  { title: '全部', type: 'all'},
  { title: '精华', type: 'good'},
  { title: '分享', type: 'ask'},
  { title: '问答', type: 'share'},
  { title: '招聘', type: 'job'},
]

@connect(({ home }) => ({
  home
}), (dispatch) => ({
  initlist() {
    return dispatch(initlist())
  },
  getTopicList(params) {
    return dispatch(getTopicList(params))
  },
  getMoreTopicList(params) {
    return dispatch(getMoreTopicList(params))
  },
}))

class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
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
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidMount() {
    this.init();
    if(process.env.TARO_ENV === 'weapp') {
      // Taro.navigateTo({
      //   url: `/pages/articleDetails/articleDetails`
      // });
    }
  }
  async init() {
    await this.props.getTopicList(this.params);
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
  async handleClick(value) {
    this.props.initlist();
    this.setState({
      loading: true,
      current: value
    });
    this.params = {
      tab: tabList[value].type,
      limit:10,
      page:1
    }
    await this.props.getTopicList(this.params);
    this.setState({
      loading: false
    });
  }
  enterTopicDetails(data) {
    // const id = data.id;
    return {
      onClick: () => {
        console.log(data)
        Taro.navigateTo({
          url: `/pages/articleDetails/articleDetails?id=${data.id}`
        })
      }
    }
  }
  enterUserInfo() {
    return {
      onClick: () => {
        alert(2)
      }
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
  render () {
    const {topicList} = this.props.home;
    console.log('topicList',topicList)
    const props = {
      ...this.props,
      enterTopicDetails: this.enterTopicDetails,
      enterUserInfo: this.enterUserInfo,
      getTab: this.getTab
    }
    return (
      <View className="homepage">
        <AtTabs
          animated={false}
          swipeable={false}
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}>
          {tabList.map((item, index) => {
            return <
              AtTabsPane current={this.state.current} index={index}>
                <View className="topicListBox">
                  {topicList.map((item, index) => {
                    return <TabItem data={item} {...props}/>
                  })}
                </View>
              </AtTabsPane>
          })}
        </AtTabs>
        {this.state.loading && <AtActivityIndicator size="50" color="#FF544F" mode='center' content='loading'></AtActivityIndicator>}

        <View className={this.state.status === 'more' ? "loadmore" : 'loadmore-loading'}>
        {!this.state.loading && <AtLoadMore
          onClick={this.loadmore.bind(this)}
          status={this.state.status}
        />}
        </View>
        <Tabbar current={0}/>
      </View>
    )
  }
}

export default Index
