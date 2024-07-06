
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "Containers/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from "Containers/HomeScreen";
import SignUpScreen from "Containers/SignUpScreen";
import ListScreen from "Containers/ListScreen";


export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen"  >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

