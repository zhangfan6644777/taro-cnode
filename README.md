## 项目介绍
基于taro taro-ui构建的项目，目前兼容h5和微信小程序，样式自己设计，接口和数据来自于[cnode社区](https://cnodejs.org/api)
``` bash
# 克隆项目
git clone https://github.com/zhangfan6644777/taro-cnode.git
  
# 安装依赖，或 npm i
yarn

# 运行小程序（微信 weapp）
npm run dev:weapp

# 运行 H5
npm run dev:h5

```

## 功能
```
  1.登录功能
  2.列表分页，滚动底部加载更多
  3.发帖，回复帖子
  4.查看消息
  5.个人中心
```
## 整体思路

1.在taro里面引入Redux，就是每个页面对应一个actions,constants,reducers,services,store,
主要由视图触发action 然后action 去dispatch对应页面的reducer，最后返回新的数据给对应的页面

- ```Index```主要是主页的列表信息,滚动底部加载更多
- ```ArticleDetails```对应文章内容页面详情,评论
- ```Publish```对应发布文章页面,默认是发布测试类型
- ```Message```对应账号的消息页面,包括已读消息和未读消息
- ```Center```对应账号的登录信息
- ```Mytopic```个人参与的文章，回复的文章

2.先做小程序，然后再去兼容H5，因为taro本来是以小程序为重心，再去兼容多端。

3.使用了taro-ui和taro原组件库混用的方式,自己去写更少的样式，在开发中达到更高的效率。如果是公司项目 对UI要求的比较严格，请使用taro原组件，然后自己去写样式

4.由于详情页面和评论返回的都是字符串html，这边针对h5和小程序分别使用了不用的处理方式，小程序自己将[wxPrase](https://github.com/icindy/wxParse)封装成taro组件[taro组件](https://github.com/zhangfan6644777/taro-cnode/tree/master/src/components/taro-wemark)，如下
```
{process.env.TARO_ENV === 'weapp' ? <wemark desc={content}/> : ''}
{process.env.TARO_ENV === 'h5' ? <View dangerouslySetInnerHTML={{ __html: content }} /> : ''}

```
5.在开发中的一些[注意点](https://nervjs.github.io/taro/docs/before-dev-remind.html)


## 其他说明

本项目代码没有做过多封装，方便阅读，如果有什么问题，可以提issue。

## 学习资源
[taro](https://taro.aotu.io/)
[taro-ui](https://taro-ui.aotu.io)
[react](https://react.docschina.org/)
[redux](https://www.redux.org.cn/)
[jsNewbee](https://juejin.im/post/5c6a151f518825625e4ac830/)



