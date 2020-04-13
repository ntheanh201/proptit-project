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
      <View style={{ height: 25, width: 25 }}>
        {showClose ? (
          <TouchableOpacity
            onPress={() => {
              onClickClose()
            }}>
            <Icon name="closecircleo" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  optionsInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
})

export default ItemTickPollEditor
