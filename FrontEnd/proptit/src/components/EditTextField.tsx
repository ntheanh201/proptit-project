import React, { Props } from "react";
import { Text, TextInput, View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface EditTextFieldProps {
    title: string;
    placeholder?: string;
    inputStyle?: 'default' | 'password' | 'number';
    style?: StyleProp<ViewStyle>;
}

export default class EditTextField extends React.Component<EditTextFieldProps> {

    constructor(props: EditTextFieldProps) {
        super(props)
        this.state = {
            isFocus: false,
        }
    }

    render() {
        const {title, placeholder, inputStyle, style} = this.props;
        return(
            <View style={style}>
               <Text>{title}</Text>
               <TextInput clearTextOnFocus={true} placeholder={placeholder} 
                    style={{borderBottomWidth: 0.5, borderBottomColor: 'rgb(44, 44, 44)'}}
                    secureTextEntry={inputStyle === 'password'? true : false} />
            </View>
        );
    }
}