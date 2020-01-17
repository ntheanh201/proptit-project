import { View } from 'react-native'
import React from 'react'
import { Input, Content, Row, Icon, Container, Button } from 'native-base'

interface Poll {
  content: string
}

interface ItemPollProp {
  poll: Poll
  onPressClose: () => void
}

const ItemPoll = (props: ItemPollProp) => {
  return (
    <View
      style={{
        alignSelf: 'baseline',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 5,
      }}>
      <Input
        placeholder={props.poll.content}
        style={{ borderWidth: 0.5, borderColor: 'gray', borderRadius: 10 }}
      />
      <Button transparent onPressIn={() => props.onPressClose()}>
        <Icon name="close" type="AntDesign" style={{ marginLeft: 10 }} />
      </Button>
    </View>
  )
}

class TickPoll extends React.Component<TickPollProps, TickPollState> {
  constructor(props: TickPollProps) {
    super(props)
    this.state = {
      listPoll: [{ content: 'Lựa chọn' }],
    }
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'baseline',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 20,
          width: '100%',
        }}>
        {this.state.listPoll.map(poll => (
          <ItemPoll
            poll={poll}
            onPressClose={() => this.handleOnPressClose()}
          />
        ))}
        <Button onPressIn={() => this.handleOnPressAdd()} transparent>
          <Icon
            name="pluscircle"
            type="AntDesign"
            style={{ fontSize: 40, marginTop: 10 }}
          />
        </Button>
      </View>
    )
  }
  handleOnPressClose() {
    if (this.state.listPoll.length === 1) return
    this.state.listPoll.pop()
    this.setState({
      listPoll: this.state.listPoll,
    })
  }
  handleOnPressAdd() {
    this.setState({
      listPoll: [...this.state.listPoll, { content: 'Lựa chọn' }],
    })
  }
}

interface TickPollProps {}

interface TickPollState {
  listPoll: Poll[]
}

export default TickPoll
