import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../values/colors'

interface FloatingButtonProps {
  onPress: () => void
}

export class FloatingButton extends React.Component<FloatingButtonProps> {
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => this.props.onPress()}>
          <Icon name="plus" style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 25,
    bottom: 25,
  },
  mainButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: colors.mainBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  icon: {
    color: 'white',
    fontSize: 25,
  },
})
