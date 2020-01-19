import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

export const WIDTH = (w: number) => width * (w / 360)
export const HEIGHT = (h: number) => height * (h / 640)
