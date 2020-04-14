import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'

interface ItemTickPollEditorProps {
  index: number
  placeHolder: string
  isShowClose: boolean
  onTextChange: (text: string) => void
  onClickClose: () => void
  onFocus: () => void
}

const ItemTickPollEditor = ({
  index,
  placeHolder,
  onClickClose,
  onTextChange,
  isShowClose,
  onFocus,
}: ItemTickPollEditorProps) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 3,
        alignItems: 'center',
      }}>
      <TextInput
        onFocus={() => onFocus()}
        placeholder={placeHolder}
        style={styles.optionsInput}
        onChangeText={onTextChange}
      />
      <View style={{ height: 25, width: 25 }}>
        {isShowClose ? (
          <TouchableOpacity
            onPress={() => {
              onClickClose()
            }}>
            <Icon name="close" style={{ fontSize: 20 }} />
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
    borderRadius: 5,
    marginHorizontal: 5,
  },
})

export default ItemTickPollEditor
