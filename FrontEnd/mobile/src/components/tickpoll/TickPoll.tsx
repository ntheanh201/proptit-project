import { View } from "react-native"
import React from "react"
import ItemTickPoll from "./ItemTickPoll"


export interface ItemTickPollRef {
    name: string,
    numberTick: number
}

interface TickPollProps {
    listItem: ItemTickPollRef[],
    totalTick: number
}

const TickPoll = ({ listItem, totalTick }: TickPollProps) => {
    return (
        <View style={{ width: '100%' }}>
            {
                listItem.map((item) => <ItemTickPoll title={item.name} numberTick={item.numberTick} totalTick={totalTick} />)
            }
        </View>
    )
}

export default TickPoll