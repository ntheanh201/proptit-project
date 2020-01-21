import { Platform } from "react-native";
import { ClassicHeaderProps } from "./ClassicHeader";
import { isIphoneXFamily } from "./Helpers"

export function container(props: ClassicHeaderProps) {
  const { height, width, backgroundColor, statusBarHidden } = props;
  return {
    width: width || "100%",
    ...Platform.select({
      ios: {
        top: 0,
        height: isIphoneXFamily()
          ? height || 60
          : height || (statusBarHidden ? 50 : 70)
      },
      android: {
        top: 0,
        height: height || (statusBarHidden ? 60 : 70)
      }
    }),
    // height: height || (Platform === "ios" ? 50 : statusBarHidden ? 90 : 120),
    backgroundColor: backgroundColor || "white"
  };
}

export function innerContainer(statusBarHidden?: boolean) {
  return {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        top: isIphoneXFamily() ? 12 : statusBarHidden ? 0 : 24
      },
      android: {
        top: statusBarHidden ? 12 : 24
      }
    })
  };
}

export function _shadowStyle(shadowColor?: string) {
  return {
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 7 },
        shadowColor: shadowColor || "#757575"
      },
      android: {
        elevation: 6
      }
    })
  };
}

export function _leftComponentStyle(leftComponentDisable?: boolean) {
  return {
    marginLeft: 16,
    opacity: leftComponentDisable ? 0 : 1
  };
}

export function _rightComponentStyle(rightComponentDisable?: boolean) {
  return {
    marginRight: 16,
    opacity: rightComponentDisable ? 0 : 1
  };
}

export default {
  centerComponentStyle: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(110, 157, 251, 1.0)"
  }
};
