import { combineReducers } from 'redux'

import homeReducer from './home'
import postReducer from './post'
import groupReducer from './group'

export default combineReducers({ homeReducer, postReducer, groupReducer })
