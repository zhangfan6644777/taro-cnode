import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtInput, AtButton, AtMessage,AtForm,AtTextarea} from 'taro-ui'
import Tabbar from '../../components/Tabbar/Tabbar'
import './publishContainer.less'
import Service from '../../services/publish';
const tabList = [
  { title: '我的话题', type: 'topic'},
  { title: '我的回复', type: 'reply'}
]

@connect(({ center }) => ({
  center
}), (dispatch) => ({
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '发布'
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
        btnLoading: false,
        selector: [{
          label: '分享',
          value: "share"
        }, {
          label: '问答',
          value: "ask"
        }, {
          label: '招聘',
          value: "job"
        }, {
          label: '测试',
          value: "dev"
        }],
        selectorChecked: {
          label: '测试',
          value: "dev"
        },
        titleValue: '',
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

  }


  goLogin() {
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
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    });
  }
  async onSubmit() {
    const {titleValue,contentValue,selectorChecked} = this.state;
    const params = {
      accesstoken:this.props.center.loginInfo.accesstoken,
      tab: selectorChecked.value,
      content: contentValue,
      title: titleValue
    }
    const data = await Service.creatTopic(params);
    if(data.success){
        Taro.atMessage({
            'message': '发帖成功',
            'type': 'success',
        })
        this.setState({
          titleValue: '',
          contentValue: ''
        })
    } else {
        Taro.atMessage({
            'message': data.error_msg,
            'type': 'error',
        })
    }
  }
  changeTitle(value) {
    this.setState({
      'titleValue': value
    })
  }
  changeContent(event) {
    this.setState({
      'contentValue': event.target.value
    })
  }
  render () {
    const {loginInfo} = this.props.center
    return (
      <View className="publishContainer">
        <AtMessage />
        {loginInfo ?
        <AtForm
          className="form"
          onSubmit={this.onSubmit.bind(this)}
        >
          <View className='page-section'>
              <View>
                <Picker mode='selector' range={this.state.selector} rangeKey="label" onChange={this.onChange}>
                  <View className='picker'>
                    当前选择：{this.state.selectorChecked.label}
                  </View>
                </Picker>
              </View>
          </View>
          <AtInput
            className="titleInput"
            name='value'
            title={decodeURI('标题')}
            type='text'
            placeholder={decodeURI('请输入标题')}
            value={this.state.titleValue}
            onChange={this.changeTitle.bind(this)}
          />
          <AtTextarea
            className="contentInput"
            value={this.state.contentValue}
            onChange={this.changeContent.bind(this)}
            maxLength={200}
            placeholder={decodeURI('请输入内容')}
          />
          <AtButton type='primary' className="submitBtn" onClick={() => this.onSubmit()}>提交</AtButton>
        </AtForm>
        :
        <View className="loginTip">请先<Text onClick={this.goLogin.bind(this)} className="login-text">登录</Text>在操作</View>
        }
        {process.env.TARO_ENV === 'weapp' ? '' : <Tabbar current={1}/>}
      </View>
    )
  }
}

export default Index
