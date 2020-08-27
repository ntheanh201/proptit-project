import React from 'react'
import { View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import ItemTickPollEditor from './ItemTickPollEditor'
import colors from '../../values/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface TickPollEditorProps {
  onClose: () => void
}

interface ItemTickPoll {
  index: number
  placeHolder: string
  content: string
}

interface TickPollEditorState {
  listOptions: Array<ItemTickPoll>
}

class TickPollEditor extends React.Component<
  TickPollEditorProps,
  TickPollEditorState
> {
  public getTickPollData() {
    const data = JSON.parse(JSON.stringify(this.state.listOptions))
    return data
  }

  constructor(props: TickPollEditorProps) {
    super(props)
    this.state = {
      listOptions: [
        {
          index: 0,
          placeHolder: 'Option 1',
          content: '',
        },
        {
          index: 1,
          placeHolder: 'Option 2',
          content: '',
        },
        {
          index: 2,
          placeHolder: 'Add Option',
          content: '',
        },
      ],
    }
  }

  render() {
    const { listOptions } = this.state
    const { onClose } = this.props

    return (
      <View
        style={{
          alignItems: 'center',
          width: '70%',
          height: '100%',
        }}>
        <FlatList
          style={{ width: '100%', height: '100%' }}
          renderItem={({ item, index }) => this.renderItem(index, item)}
          data={listOptions}
        />
      </View>
    )
  }

  onPressAddOptions() {
    const stateClone = JSON.parse(JSON.stringify(this.state.listOptions))

    const lastItem = stateClone[stateClone.length - 1]

    stateClone[stateClone.length - 1] = {
      ...lastItem,
      placeHolder: `Option ${lastItem.index + 1}`,
    }

    stateClone.push({
      index: this.state.listOptions.length,
      placeHolder: 'Add Option',
      content: '',
    })
    this.setState({
      listOptions: stateClone,
    })
  }

  validatePlaceHolder(list: ItemTickPoll[]) {
    list.forEach((value, index) => {
      value.index = index
      if (index === list.length - 1) {
        return
      }
      value.placeHolder = `Options ${index + 1}`
    })
  }

  renderItem(index: number, item: ItemTickPoll) {
    const { listOptions } = this.state
    const { onClose } = this.props

    return (
      <ItemTickPollEditor
        isShowClose={index !== listOptions.length - 1}
        placeHolder={item.placeHolder}
        onFocus={() => {
          if (index === listOptions.length - 1) {
            this.onPressAddOptions()
          }
        }}
        text={item.content}
        isLast={index === listOptions.length - 1}
        onTextChange={(text) => {
          item.content = text
        }}
        onClickClose={() => {
          if (listOptions.length === 2) {
            onClose()
            return
          }

          const _tmp = listOptions.filter((v, i) => {
            return v.index !== item.index
          })

          console.log(
            'AppLog',
            _tmp.map((v, i) => v.content),
          )

          this.validatePlaceHolder(_tmp)

          this.setState({
            listOptions: _tmp,
          })
        }}
      />
    )
  }
}

export default TickPollEditor
