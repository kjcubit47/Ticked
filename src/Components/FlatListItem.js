import { STYLES } from 'Constants';
import React from 'react';
import { View, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';

function FlatListItem({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>

            <View style={styles.item}>
                <Text style={STYLES.Text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

export default FlatListItem;