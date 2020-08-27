import { combineReducers } from 'redux'

import homeReducer from './home'
import postReducer from './post'
import groupReducer from './group'
import reactionReducer from './reaction'

export default combineReducers({
  homeReducer,
  postReducer,
  groupReducer,
  reactionReducer
})
