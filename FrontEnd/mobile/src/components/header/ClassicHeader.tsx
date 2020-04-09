import React from 'react'
import ViewPropsTypes from 'prop-types'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewProps,
  Insets,
  Platform,
  ViewStyle,
} from 'react-native'
// Styles
import _styles, {
  container,
  _shadowStyle,
  innerContainer,
  _leftComponentStyle,
  _rightComponentStyle,
} from './ClassicHeader.style'
import colors from '../../values/colors'
import Icon from 'react-native-vector-icons/Ionicons'

const hitSlop = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 30,
}

export interface ClassicHeaderProps {
  styles?: StyleProp<ViewProps>
  hitSlops?: Insets
  shadowStyle?: StyleProp<ViewProps>
  headerTitle?: string
  shadowColor?: string
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  centerComponent?: React.ReactNode
  statusBarHidden?: boolean
  leftComponentStyle?: StyleProp<ViewStyle>
  rightComponentStyle?: StyleProp<ViewStyle>
  leftComponentDisable?: boolean
  leftComponentOnPress?: () => void
  centerComponentStyle?: StyleProp<ViewStyle>
  rightComponentDisable?: boolean
  rightComponentOnPress?: () => void
  height?: string | number
  width?: string | number
  backgroundColor?: string
}

const ClassicHeader = (props: ClassicHeaderProps) => {
  const {
    styles,
    hitSlops,
    shadowStyle,
    headerTitle,
    shadowColor,
    leftComponent,
    rightComponent,
    centerComponent,
    statusBarHidden,
    leftComponentStyle,
    rightComponentStyle,
    leftComponentDisable,
    leftComponentOnPress,
    centerComponentStyle,
    rightComponentDisable,
    rightComponentOnPress,
  } = props
  return (
    <SafeAreaView>
      <View
        style={[
          styles || container(props),
          shadowStyle || _shadowStyle(shadowColor),
        ]}>
        <View style={[innerContainer(statusBarHidden)]}>
          {leftComponent || (
            <TouchableOpacity
              style={
                leftComponentStyle || _leftComponentStyle(leftComponentDisable)
              }
              hitSlop={hitSlops}
              onPress={leftComponentOnPress}>
              {Platform.OS == 'ios' ? (
                <Icon
                  size={30}
                  name="ios-arrow-back"
                  color={colors.mainBlue}
                  // {...props}
                />
              ) : (
                <Icon
                  size={30}
                  name="md-arrow-back"
                  color={colors.mainBlue}
                  // {...props}
                />
              )}
            </TouchableOpacity>
          )}
          {centerComponent || (
            <Text style={[centerComponentStyle, { color: 'black' }]}>
              {headerTitle}
            </Text>
          )}
          {rightComponent || (
            <TouchableOpacity
              style={
                rightComponentStyle ||
                _rightComponentStyle(rightComponentDisable)
              }
              hitSlop={hitSlops}
              onPress={rightComponentOnPress}>
              <Icon name="ios-menu" size={30} color="white" {...props} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

ClassicHeader.ViewPropsTypes = {
  hitSlops: ViewPropsTypes.object,
  ratings: ViewPropsTypes.string,
}

ClassicHeader.defaultProps = {
  hitSlops: hitSlop,
  centerComponentStyle: _styles.centerComponentStyle,
}

export default ClassicHeader
