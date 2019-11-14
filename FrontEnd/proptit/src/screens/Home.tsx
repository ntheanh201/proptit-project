import { BaseScreen } from "./BaseScreen";
import React from "react";
import { Text, Button } from "react-native";

export default class Home extends BaseScreen {
    render() {
        return (
          <React.Fragment>
              <Text>Home</Text>
              <Button title="Pop" onPress={() => this.pop()}/>
          </React.Fragment> 
        );
    }
}