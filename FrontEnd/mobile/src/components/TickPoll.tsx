import { Row, View, Text } from "native-base";
import { TickPoll as TP, ItemTickPoll as ITP } from "../core"
import React from "react"
import ProgressBar from './ProgressBar';

interface TickPollProps {
    tickpoll: TP
}

interface ItemTickPollProps {
    item: ITP,
    sumVote: number
}

const ItemTickPoll = ({ item, sumVote }: ItemTickPollProps) => {
    return (
        <View style={{ flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text>{item.content}</Text>
            <ProgressBar progress={20} style={{ marginHorizontal: 10 }} />
            <Text>40%</Text>
        </View>
    )
}

export default class TickPoll extends React.Component<TickPollProps> {
    render() {
        const { tickpoll } = this.props
        return (
            <View>
                <ItemTickPoll item={{ id: "", content: "React", vote: 40, listVote: [] }} sumVote={100} />
                <ItemTickPoll item={{ id: "", content: "Flutter", vote: 60, listVote: [] }} sumVote={100} />
            </View>
        )
    }
}