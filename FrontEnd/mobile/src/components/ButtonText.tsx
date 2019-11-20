import React from 'react';
import { Button, Text } from 'native-base';

export default class ButtonText extends React.Component<ButtonTextProps> {

    render() {
        const { text, color, onPress } = this.props;
        return (
            <Button color={color} style={{flex: 1, justifyContent: 'center'}} onPress={onPress}>
                <Text>{text}</Text>
            </Button>
        );
    }
}

interface ButtonTextProps {
    text?: string,
    color?: string,
    onPress: () => void
}