import { Dimensions, Platform, StatusBar } from 'react-native'
import { User, Post, Comment, Group } from '../core'

const { width, height } = Dimensions.get('screen')
const baseURL = 'http://apis.aiforce.xyz'

export const WIDTH = (w: number) => width * (w / 360)
export const HEIGHT = (h: number) => height * (h / 640)

export const getStatusBarHeight = (): number => {
  const X_WIDTH = 375
  const X_HEIGHT = 812

  const XSMAX_WIDTH = 414
  const XSMAX_HEIGHT = 896

  let haveNotch = false

  const { width: w, height: h } = Dimensions.get('window')

  if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
    if (
      (w === X_WIDTH && h === X_HEIGHT) ||
      (w === XSMAX_WIDTH && h === XSMAX_HEIGHT)
    ) {
      haveNotch = true
    }
  }
  return Platform.select({
    ios: haveNotch ? 44 : 30,
    android: StatusBar.currentHeight! > 20 ? StatusBar.currentHeight : 0,
    default: 0,
  })
}
