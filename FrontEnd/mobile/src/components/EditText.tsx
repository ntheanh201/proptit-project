import React, { Props } from "react";
import { Item, Label, Input} from "native-base";

export default class EditText extends React.Component<EditTextProps, any> {

    constructor(props: EditTextProps) {
        super(props);
    }

    render() {
        const {title, placeholder, inputStyle, onChangeText} = this.props;
        return (
            <Item stackedLabel>
                <Label>{title}</Label>
                <Input secureTextEntry={inputStyle === 'password'? true : false} 
                    onChangeText={onChangeText} 
                    placeholder={placeholder} />
            </Item>
        );
    }
}

interface EditTextProps {
    title: string;
    inputStyle?: 'default' | 'password';
    placeholder?: string;
    onChangeText?: (text: string) => void;
}