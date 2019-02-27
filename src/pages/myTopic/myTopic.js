import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtMessage,AtListItem} from 'taro-ui'
import Tabbar from '../../components/Tabbar/Tabbar'
// import './publishContainer.less'
import Service from '../../services/publish';
import moment from 'moment'

@connect(({ center }) => ({
  center
}), (dispatch) => ({
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
  jump(id) {
    Taro.navigateTo({
        url: `/pages/articleDetails/articleDetails?id=${id}`
    });
  }
  render () {
    const {userInfo} = this.props.center
    console.log(userInfo);
    const {from} = this.$router.params;
    const topicArray = from === 'creat' ? userInfo.recent_topics : from === 'reply' ? userInfo.recent_replies : []
    return (
      <View className="publishContainer">
        <AtMessage />
        {topicArray.length !== 0 ? topicArray.map((item) => {
            return <AtListItem
            title={decodeURI(item.title)}
            arrow='right'
            extraText={moment(item.last_reply_at).format("YYYY-MM-DD")}
            onClick={() => this.jump(item.id)}
        />
        })
        :
        <View style={{textAlign: 'center'}}>暂无数据</View>
        }
        {/* <Tabbar current={1}/> */}
      </View>
    )
  }
}

export default Index
