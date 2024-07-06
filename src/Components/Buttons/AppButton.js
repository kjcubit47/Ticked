import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { STYLES } from 'Constants';
import AppText from 'Components/AppText';
export default function AppButton({ onPress, title, textStyle, style }) {
    return (
        <TouchableOpacity style={[STYLES.Button, style]} onPress={onPress}>
            <View >
                {title && <AppText style={[STYLES.Text, textStyle]}>{title}</AppText>}
            </View>
        </TouchableOpacity>
    )
}


