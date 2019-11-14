import { BaseScreen } from "./BaseScreen";
import React from "react";
import { Text, Button } from "react-native";

export default class SignIn extends BaseScreen {
    render() {
        return (
            <React.Fragment>
                <Text>Sign In</Text>
                <Button title="Home" onPress={() => this.navigate('Home')}/>
            </React.Fragment>
        )
    }
}