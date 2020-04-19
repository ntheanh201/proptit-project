import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import environments from 'environments'

import rootReducer from './reducers'

const client = axios.create({
  baseURL: environments.BASE_URL,
  responseType: 'json'
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let middlewares = [thunk, axiosMiddleware(client)]

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)
