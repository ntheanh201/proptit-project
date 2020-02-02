// import axios from 'axios'

// import environments from 'environments'

// class SignInService {
//   protected baseURL = environments.baseUrl

//   requestSignIn(username: string, password: string): Promise<string> {
//     this.baseURL += '/login'
//     return axios
//       .post(this.baseURL, { username: username, password: password })
//       .then(async res => {
//         await AsyncStorage.setItem('username', username, err =>
//           console.log(err)
//         )
//         await AsyncStorage.setItem('password', password, err =>
//           console.log(err)
//         )
//         await AsyncStorage.setItem('TOKEN', res.data.token, err =>
//           console.log(err)
//         )
//         await AsyncStorage.setItem('userId', res.data.user, err =>
//           console.log(err)
//         )
//         return res.data.user
//       })
//       .catch(err => {
//         console.log('ERR ON SIGN IN', err)
//         return null
//       })
//   }

//   async checkLogin(): Promise<boolean> {
//     const token = await AsyncStorage.getItem('TOKEN')
//     return await axios
//       .get(this.baseURL, { headers: { authorization: token } })
//       .then(res => {
//         if (res.data.success) {
//           return true
//         } else return false
//       })
//       .catch(err => {
//         console.log(err)
//         return false
//       })
//   }
// }

// export const signInService = new SignInService()
