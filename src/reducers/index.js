import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import articleDetails from './articleDetails'
export default combineReducers({
  counter,
  home,
  articleDetails
})
