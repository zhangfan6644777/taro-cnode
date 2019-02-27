const HOST = 'https://cnodejs.org';
//home
export const http_get_topicList = () => `${HOST}/api/v1/topics`;
//topics
export const http_get_topicDetails = (id) => `${HOST}/api/v1/topic/${id}`;
export const http_post_collectTopic = () => `${HOST}/api/v1/topic_collect/collect`;
export const http_post_deCollectTopic = () => `${HOST}/api/v1/topic_collect/de_collect`;
//reply
export const http_post_addReply = (topicId) => `${HOST}/api/v1/topic/${topicId}/replies`;
export const http_post_upsReply = (replyId) => `${HOST}/api/v1/reply/${replyId}/ups`;
//publish
export const http_post_creatTopic = () => HOST + '/api/v1/topics';
//mine
export const http_get_userinfo = (loginname) => `${HOST}/api/v1/user/${loginname}`;
export const http_get_userCollectTopic = (loginname) => `${HOST}/api/v1/topic_collect/${loginname}`;
//message
export const http_get_message = () => `${HOST}/api/v1/messages`;
export const http_get_messageCount = () => `${HOST}/api/v1/user/alsotang`;
export const http_post_markOne = (msgId) => `${HOST}/api/v1/message/mark_one/${msgId}`;
export const http_post_markAll = () => `${HOST}/api/v1/message/mark_all`;
//myTopic

//accesstoken
export const http_post_accesstoken = () => `${HOST}/api/v1/accesstoken`;
