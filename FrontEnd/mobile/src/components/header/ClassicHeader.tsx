import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, View, Text, TouchableOpacity, StyleProp, ViewProps, Insets } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// Styles
import _styles, {
  container,
  _shadowStyle,
  innerContainer,
  _leftComponentStyle,
  _rightComponentStyle
} from "./ClassicHeader.style";

const hitSlop = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 30
};

interface ClassicHeaderProps {
  styles?: StyleProp<ViewProps>,
  hitSlops?: Insets,
  shadowStyle?: StyleProp<ViewProps>,
  headerTitle?: string,
  shadowColor?: string,
  leftComponent?: React.Component,
  rightComponent?: React.Component,
  centerComponent?: React.Component,
  statusBarHidden?: boolean,
  leftComponentStyle?: StyleProp<ViewProps>,
  rightComponentStyle?: StyleProp<ViewProps>,
  leftComponentDisable?: boolean,
  leftComponentOnPress?: () => void,
  centerComponentStyle?: StyleProp<ViewProps>,
  rightComponentDisable?: boolean,
  rightComponentOnPress?: () => void
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
    rightComponentOnPress
  } = props;
  return (
    <SafeAreaView>
      <View
        style={[
          styles || container(props),
          shadowStyle || _shadowStyle(shadowColor)
        ]}
      >
        <View style={[innerContainer(statusBarHidden)]}>
          {leftComponent || (
            <TouchableOpacity
              style={
                leftComponentStyle || _leftComponentStyle(leftComponentDisable)
              }
              hitSlop={hitSlops}
              onPress={leftComponentOnPress}
            >
              <Icon
                size={30}
                // type="Ionicons"
                name="ios-arrow-back"
                color="rgba(110, 157, 251, 1.0)"
                {...props}
              />
            </TouchableOpacity>
          )}
          {centerComponent || (
            <Text style={[centerComponentStyle]}>{headerTitle}</Text>
          )}
          {rightComponent || (
            <TouchableOpacity
              style={
                rightComponentStyle ||
                _rightComponentStyle(rightComponentDisable)
              }
              hitSlop={hitSlops}
              onPress={rightComponentOnPress}
            >
              <Icon
                name="ios-menu"
                type="ionicon"
                size={30}
                color="white"
                {...props}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

ClassicHeader.propTypes = {
  hitSlops: PropTypes.object,
  ratings: PropTypes.string
};

ClassicHeader.defaultProps = {
  hitSlops: hitSlop,
  centerComponentStyle: _styles.centerComponentStyle
};

export default ClassicHeader;
