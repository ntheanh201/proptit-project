import React from 'react'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
// import store from './app/redux'
// import { Preloader } from './app/Preloader'

// import './index.css'
// import 'tabler-react/dist/Tabler.css'

import App from './app'

// const OldVer = (
//   <Provider store={store}>
//     <Preloader>
//       <AppComponent />
//     </Preloader>
//   </Provider>
// )

ReactDOM.render(<App />, document.getElementById('app'))
