import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { COLORS, STYLES } from '../Constants';

function Screen({ children, style }) {
    return (
        <View style={[STYLES.Screen, style]}>
            <StatusBar backgroundColor={"red"} ></StatusBar>
            {children}
        </View >
    );
}



export default Screen;