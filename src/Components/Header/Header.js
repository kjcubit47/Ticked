import React from 'react';
import { View, StyleSheet } from 'react-native';
import { STYLES } from 'Constants';
import AppText from 'Components/AppText';
function Header({ leftItem, centerItem, title, rightItem, style }) {
    return (
        <View style={[STYLES.Header, style]}>
            <View style={styles.left}>
                {leftItem && leftItem}
            </View>
            <View style={styles.center}>
                {title && !centerItem && <AppText style={STYLES.Header.Text}>{title}</AppText>}
                {centerItem && !title && centerItem}
            </View>
            <View style={styles.right}>
                {rightItem && rightItem}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        left: 0
    },
    center: {
        justifyContent: 'center',
    },
    right: {
        position: 'absolute',
        right: 5
    },
})

export default Header;