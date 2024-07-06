import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from './Screen';
import AppButton from 'Components/Buttons/AppButton';

function SignUpScreen({ navigation }) {
    return (
        <Screen>
            <AppButton style={{ paddingTop: 50, top: 100 }}
                title="TODO go back"
                onPress={() => { navigation.pop() }}
            >

            </AppButton>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default SignUpScreen;