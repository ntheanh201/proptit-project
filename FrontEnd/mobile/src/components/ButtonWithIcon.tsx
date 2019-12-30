import { Button, Icon, Text, Container, Row } from "native-base";

import React from "react";
import colors from "../values/colors";
import { View } from "react-native";

export default class ButtonWithIcon extends React.Component<ButtonWithIconProps> {
    render() {
        const { name, text, onPress } = this.props
        var { colorIcon } = this.props

        colorIcon == null || colorIcon == undefined ? colorIcon = colors.blue01 : null

        return (
            <View style={{ flex: 1 }}>
                <Button iconLeft transparent style={{alignSelf: 'baseline'}} onPress={onPress}>
                    <Icon name={name} type="FontAwesome" style={{ color: colorIcon }} />
                    {text ? <Text style={{ color: 'black' }}>{text}</Text> : null}
                </Button>
            </View>
        )
    }
}

interface ButtonWithIconProps {
    name: string,
    text?: string,
    colorIcon?: string
    onPress?: () => void
}