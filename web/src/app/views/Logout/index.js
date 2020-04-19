import { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { PreloaderContext } from '../../Preloader'

const Logout = ({ history }) => {
  const { setState: setPreloaderState } = useContext(PreloaderContext)

  useEffect(() => {
    setPreloaderState({ isLoggedIn: false })
    history.push({ pathname: '/' })
  }, [])
  return null
}

export default withRouter(Logout)
