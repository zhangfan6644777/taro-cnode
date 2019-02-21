import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.less'

import { AtTabBar, AtTabs, AtTabsPane} from 'taro-ui'
import { getTopicList } from '../../actions/home'
import Tabbar from '../../components/Tabbar/Tabbar'


@connect(({ home }) => ({
  home
}), (dispatch) => ({
  getTopicList() {
    dispatch(getTopicList())
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
      page: 1
    };
    this.state = { current: 1 };
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
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  render () {
    const {topicList} = this.props.home;
    console.log(topicList)
    return (
      <View className='index'>
        <AtTabs
          animated={false}
          current={this.state.current}
          tabList={[
            { title: '标签页1' },
            { title: '标签页2' },
            { title: '标签页3' }
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View style='background-color: #FFF;text-align: center;'>
              {topicList.map((item, index) => {
                return <View>{index}</View>
              })}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FFF;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FFF;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
        <Tabbar/>
      </View>
    )
  }
}

export default Index
