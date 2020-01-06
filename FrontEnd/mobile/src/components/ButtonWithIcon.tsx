import { Button, Icon, Text, Container, Row } from "native-base";

import React from "react";
import colors from "../values/colors";
import { View } from "react-native";

export default class ButtonWithIcon extends React.Component<ButtonWithIconProps> {
    render() {
        const { name, text, onPress, colorIcon } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Button iconLeft transparent style={{ alignSelf: 'baseline' }} onPress={onPress}>
                    <Icon name={name} type="AntDesign" style={{ color: colorIcon ? colorIcon : 'gray' }} />
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