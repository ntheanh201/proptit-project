import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'

interface ItemTickPollEditorProps {
  index: number
  showClose: boolean
  onClickClose: () => void
}

const ItemTickPollEditor = ({
  index,
  showClose,
  onClickClose,
}: ItemTickPollEditorProps) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 3,
        alignItems: 'center',
      }}>
      <TextInput placeholder="Options" style={styles.optionsInput} />
      {showClose ? (
        <TouchableOpacity
          onPress={() => {
            onClickClose()
          }}>
          <Icon name="closecircleo" />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  optionsInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
})

export default ItemTickPollEditor
