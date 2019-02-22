import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.less'

import { AtTabBar, AtTabs, AtTabsPane} from 'taro-ui'
import { getTopicList, initlist } from '../../actions/home'
import Tabbar from '../../components/Tabbar/Tabbar'
import TabItem from '../../components/TopicItem/TopicItem'

const tabList = [
  { title: '全部', type: 'all'},
  { title: '精华', type: 'good'},
  { title: '分享', type: 'ask'},
  { title: '问答', type: 'share'},
  { title: '招聘', type: 'job'},
  { title: '测试', type: 'test'}
]

@connect(({ home }) => ({
  home
}), (dispatch) => ({
  initlist() {
    dispatch(initlist())
  },
  getTopicList(params) {
    dispatch(getTopicList(params))
  }
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
    this.state = { current: 0 };
    console.log('props', props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidMount() {
    this.props.getTopicList(this.params);
  }
  async handleClick(value) {
    this.props.initlist();
    this.setState({
      current: value
    });
    this.params = {
      tab: tabList[value].type,
      limit:10,
      page:1
    }
    await this.props.getTopicList(this.params);
  }
  enterTopicDetails() {
    return {
      onClick: () => {
        alert(1)
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
  render () {
    const {topicList} = this.props.home;
    const props = {
      ...this.props,
      enterTopicDetails: this.enterTopicDetails,
      enterUserInfo: this.enterUserInfo,
      getTab: this.getTab
    }
    return (
      <View className='index'>
        <AtTabs
          animated={false}
          swipeable={false}
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}>
          {tabList.map((item, index) => {
            return <
              AtTabsPane current={this.state.current} index={index}>
                <View style='background-color: #FFF;text-align: center;'>
                  {topicList.map((item, index) => {
                    return <TabItem data={item} {...props}/>
                  })}
                </View>
              </AtTabsPane>
          })}
        </AtTabs>
        <Tabbar/>
      </View>
    )
  }
}

export default Index
