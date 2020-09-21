import React from 'react'
import {
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../../values/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ItemTickPollEditor } from './ItemTickPollEditor'

interface TickPollEditorProps {
  onClose: () => void
  deleteItem: (index: number) => void
  onPressAddOptions: () => void
  onTextChange: (text: string, index: number) => void
  listPolls: string[]
}

interface TickPollEditorState {}

export class TickPollEditor extends React.Component<
  TickPollEditorProps,
  TickPollEditorState
> {
  constructor(props: TickPollEditorProps) {
    super(props)
  }

  render() {
    const {
      onClose,
      deleteItem,
      onPressAddOptions,
      listPolls,
      onTextChange,
    } = this.props

    return (
      <ScrollView style={{ width: '100%', height: '80%' }}>
        {listPolls.map((item, index) => {
          return (
            <ItemTickPollEditor
              placeHolder={`Option ${index + 1}`}
              value={item}
              onTextChange={(text) => onTextChange(text, index)}
              onClickClose={() => {
                if (listPolls.length === 1) {
                  onClose()
                } else {
                  deleteItem(index)
                }
              }}
            />
          )
        })}
        <TouchableWithoutFeedback onPress={onPressAddOptions}>
          <Text
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              borderColor: 'gray',
              marginLeft: 5,
              marginRight: 30,
              color: 'gray',
            }}>
            Add Option...
          </Text>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}
