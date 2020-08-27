import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import loadable from '@loadable/component'

import { LoadingIndicator } from 'ui'

import store from './app/redux'
import { Preloader } from './app/Preloader'

import './index.css'
import 'tabler-react/dist/Tabler.css'
import '../node_modules/font-awesome/css/font-awesome.css'; 

const AppComponent = loadable(() => import('./app'), {
  fallback: LoadingIndicator
})

render(
  <Provider store={store}>
    <Preloader>
      <AppComponent />
    </Preloader>
  </Provider>,
  document.querySelector('#app')
)
