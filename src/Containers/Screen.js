import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { STYLES, COLORS } from '../Constants';
import { isAndroid } from 'util/index.js';

function Screen({ children, style, statusBarColor = COLORS.primary }) {
    if (isAndroid()) {
        return (
            <View style={[STYLES.Screen, style]}>
                <StatusBar backgroundColor={statusBarColor} ></StatusBar>
                {children}
            </View >
        );
    }
    else {
        return (
            <SafeAreaView style={[STYLES.Screen, style]}>
                {children}
            </SafeAreaView>
        )
    }
}



export default Screen;