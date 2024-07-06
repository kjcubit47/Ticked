import React from 'react';
import { Image, View, StyleSheet, Button } from 'react-native';
import AppButton from 'Components/Buttons/AppButton';
import Screen from './Screen';
function LoginScreen({ navigation }) {
    return (
        <Screen>
            <Image style={{ top: 0, position: 'absolute' }} source={require("../../assets/LoginScreenBackground.jpeg")} />
            <View style={styles.buttonContainer}>

                <AppButton title="Login" onPress={() => { navigation.navigate("SignUpScreen") }} />
                <AppButton title="Skip" onPress={() => { navigation.navigate("HomeScreen") }} />

            </View>
        </Screen >);
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
    }
})

export default LoginScreen;