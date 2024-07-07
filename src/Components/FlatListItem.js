import { STYLES } from 'Constants';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from 'Constants';
function FlatListItem({ title, onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress}>

            <View style={[styles.item, style]}>
                <Text style={STYLES.Text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        padding: 10,
        height: 60,
        justifyContent: 'center'
        // marginVertical: 8,
    }
});

export default FlatListItem;