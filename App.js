
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "Containers/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from "Containers/HomeScreen";
import SignUpScreen from "Containers/SignUpScreen";
import ListScreen from "Containers/ListScreen";
import SublistDetailScreen from "Containers/SublistDetailScreen";
import { Provider } from "react-redux";
import store, { persistor } from "Redux/Store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView>

      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>

          <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen"  >
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="ListScreen" component={ListScreen} />
              <Stack.Screen name="SublistDetailScreen" component={SublistDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

