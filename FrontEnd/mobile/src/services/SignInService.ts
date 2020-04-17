import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { User, AuthKey } from '../core'

class SignInService {
  protected authURL = 'http://apis.aiforce.xyz/auth/jwt/create'
  protected userAuthURL = 'http://apis.aiforce.xyz/auth/users/me'

  requestSignIn(username: string, password: string): Promise<AuthKey> {
    return axios
      .post(this.authURL, { username: username, password: password })
      .then(async (res) => {
        await AsyncStorage.setItem('authKey', JSON.stringify(res.data), (err) =>
          console.log(err),
        )
        return res.data
      })
      .catch((err) => {
        console.log('ERR ON SIGN IN', err)
        return null
      })
  }

  getUserAfterAuth(accessKey: string): Promise<User> {
    console.log(`Bearer ${accessKey}`)
    return axios
      .get(this.userAuthURL, {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async checkLogin(): Promise<boolean> {
    const token = await AsyncStorage.getItem('TOKEN')
    return await axios
      .get(this.authURL, { headers: { authorization: token } })
      .then((res) => {
        if (res.data.success) {
          return true
        } else {
          return false
        }
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }
}

export const signInService = new SignInService()
