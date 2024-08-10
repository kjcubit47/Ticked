import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "Containers/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "Containers/HomeScreen";
import SignUpScreen from "Containers/SignUpScreen";
import ListScreen from "Containers/ListScreen";
import SublistDetailScreen from "Containers/SublistDetailScreen";

const Stack = createNativeStackNavigator();

function MainNavigator(props) {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen"  >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="ListScreen" component={ListScreen} />
                <Stack.Screen name="SublistDetailScreen" component={SublistDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default MainNavigator;