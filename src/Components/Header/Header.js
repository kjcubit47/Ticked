import React from 'react';
import { View, StyleSheet } from 'react-native';
import { STYLES } from 'Constants';
import AppText from 'Components/AppText';
function Header({ leftItem, centerItem, title, rightItem, style }) {
    return (
        <View style={STYLES.Header}>
            {leftItem && leftItem}
            {title && !centerItem && <AppText style={STYLES.Header.Text}>{title}</AppText>}
            {centerItem && !title && centerItem}
            {rightItem && rightItem}
        </View>
    );
}
export default Header;