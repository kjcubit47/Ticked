import Screen from "./src/Containers/Screen";
import React, { useState } from "react";
import { Text, SafeAreaView, View, Button } from "react-native"

export default function App() {
  const [c, sc] = useState('red')
  return (
    <Screen>
      <View style={{ backgroundColor: c, flex: 1, paddingTop: 100 }}>
        <Text>TO DO </Text>
        <Button title="ass" onPress={() => { sc('green'); console.log(c) }}></Button>
      </View>
    </Screen>
  );
}

