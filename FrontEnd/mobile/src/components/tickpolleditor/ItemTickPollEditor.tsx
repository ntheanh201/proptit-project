import { View, Text, TextInput, StyleSheet, ViewProps } from 'react-native'
import React, { LegacyRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'

interface ItemTickPollEditorProps {
  placeHolder: string
  value: string
  onTextChange: (text: string) => void
  onClickClose: () => void
}

export const ItemTickPollEditor = ({
  value,
  placeHolder,
  onClickClose,
  onTextChange,
}: ItemTickPollEditorProps) => {
  let textInput = React.createRef<TextInput>()

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
      }}>
      <TextInput
        ref={textInput}
        value={value}
        placeholder={placeHolder}
        style={styles.optionsInput}
        onChangeText={onTextChange}
      />
      <View style={{ height: 35, width: 25, justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            textInput.current?.clear()
            onClickClose()
          }}>
          <Icon name="close" style={{ fontSize: 20 }} color={'gray'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  optionsInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
})
