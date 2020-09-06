import { View, Text, TextInput, StyleSheet, ViewProps } from 'react-native'
import React, { LegacyRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'

interface ItemTickPollEditorProps {
  isLast: boolean
  placeHolder: string
  isShowClose: boolean
  text: string
  onTextChange: (text: string) => void
  onClickClose: () => void
  onFocus: () => void
}

export const ItemTickPollEditor = ({
  isLast,
  text,
  placeHolder,
  onClickClose,
  onTextChange,
  isShowClose,
  onFocus,
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
      {isLast ? (
        <TextInput
          ref={textInput}
          value=""
          onFocus={() => onFocus()}
          placeholder={placeHolder}
          style={styles.optionsInput}
          onChangeText={onTextChange}
        />
      ) : (
        <TextInput
          ref={textInput}
          defaultValue={text}
          onFocus={() => onFocus()}
          placeholder={placeHolder}
          style={styles.optionsInput}
          onChangeText={onTextChange}
        />
      )}
      <View style={{ height: 35, width: 25, justifyContent: 'center' }}>
        {isShowClose ? (
          <TouchableOpacity
            onPress={() => {
              textInput.current?.clear()
              onClickClose()
            }}>
            <Icon name="close" style={{ fontSize: 20 }} color={'gray'} />
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
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
})
