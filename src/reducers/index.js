import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import articleDetails from './articleDetails'
import center from './center'
import message from './message'
export default combineReducers({
  counter,
  home,
  articleDetails,
  center,
  message
})
