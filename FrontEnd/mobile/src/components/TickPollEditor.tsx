import { Button, Icon, Input } from "native-base";
import React from "react";
import { View } from "react-native";

interface Poll {
    content: string;
}

interface ItemEditorPollEditorProp {
    poll: Poll;
    onPressClose: () => void
}

const ItemEditorPoll = (props: ItemEditorPollEditorProp) => {

    return (
        <View style={{ alignSelf: 'baseline', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 5 }}>
            <Input placeholder={props.poll.content} style={{ borderWidth: 0.5, borderColor: 'gray', borderRadius: 10 }} />
            <Button transparent onPressIn={() => props.onPressClose()}>
                <Icon name="close" type="AntDesign" style={{ marginLeft: 10 }} />
            </Button>
        </View>
    )
}

class TickEditorPoll extends React.Component<TickEditorPollProps, TickEditorPollState> {

    constructor(props: TickEditorPollProps) {
        super(props);
        this.state = {
            listPoll: [{ content: "Lựa chọn" }]
        }
    }

    render() {
        return (
            <View style={{ alignSelf: 'baseline', flexDirection: 'column', alignItems: 'center', padding: 20, width: '100%' }}>
                {
                    this.state.listPoll.map(poll => (<ItemEditorPoll poll={poll} onPressClose={() => this.handleOnPressClose()} />))
                }
                <Button onPressIn={() => this.handleOnPressAdd()} transparent>
                    <Icon name="pluscircle" type="AntDesign" style={{ fontSize: 40, marginTop: 10 }} />
                </Button>
            </View>
        )
    }
    handleOnPressClose() {
        if (this.state.listPoll.length === 1) this.props.onPressClose()
        this.state.listPoll.pop()
        this.setState({
            listPoll: this.state.listPoll
        })
    }
    handleOnPressAdd() {
        this.setState({
            listPoll: [...this.state.listPoll, { content: "Lựa chọn" }]
        })
    }
}

interface TickEditorPollProps {
    onPressClose: () => void
}

interface TickEditorPollState {
    listPoll: Poll[]
}

export default TickEditorPoll;