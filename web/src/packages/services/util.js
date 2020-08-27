export const getAccessKey = () => {
  if (localStorage && localStorage.getItem('authToken')) {
    const authToken = JSON.parse(localStorage.getItem('authToken'))
    return authToken.access
  }
  return null
}

export const getRefreshToken = () => {
  if (localStorage && localStorage.getItem('authToken')) {
    const authToken = JSON.parse(localStorage.getItem('authToken'))
    return authToken.refresh
  }
  return null
}
