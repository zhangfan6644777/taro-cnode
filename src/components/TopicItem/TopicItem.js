import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image} from '@tarojs/components'
import './TopicItem.less'
import moment from 'moment'
export default class TopicList extends Component{
    constructor(props) {
        super(props);
        /**
        * 指定config的类型声明为: Taro.Config
        *
        * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
        * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
        * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
        */
    
        // this.params = {
        //   limit: 10,
        //   page: 1
        // };
        // this.state = { current: 1 };
        // console.log('props', props);
    }
    componentWillReceiveProps(nextProps) {}
    componentWillUnmount() {}
    componentDidShow() {}
    componentDidHide() {}
    componentDidMount() {}
    enterTopicDetails() {

    }
    enterUserInfo() {

    }
    render() {
        const {data,getTab} = this.props;
        return (
            <View className="topicItem" {...this.props.enterTopicDetails(data)}>
                <View className="topicTitle" >
                    <Text className="item-info-tab">{getTab(data.top,data.good,data.tab)}</Text>
                    <Text className="item-info-title">{data.title}</Text>
                </View>
                <View className="topicContent">
                <Image className="avatar"  src={data.author.avatar_url}/>
                <View className="topicInfo">
                    <View className="topicInfo-box"><Text>{data.author.loginname}</Text><Text>{data.reply_count}/{data.visit_count}</Text></View>
                    <View className="topicInfo-box"><Text>replyAt {moment(data.last_reply_at).format('YYYY-MM-DD')}</Text><Text>creatAt {moment(data.last_reply_at).format('YYYY-MM-DD')}</Text></View>
                </View>
                </View>
            </View>
        )
    }
}