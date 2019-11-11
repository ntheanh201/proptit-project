import { View, Text } from "react-native";
import React from "react";

const App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  return (
    <View>
      <Text>Hello World!!!</Text>
    </View>
  )
}

export default App;