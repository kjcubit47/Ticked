import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import IconButton from './Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';

function SublistItem({ title, complete, style, onPress, IconOnPress }) {
    return (

        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={{ flex: 1 }}>
                <Text style={STYLES.Text}>{title}</Text>

            </View>
            <TouchableOpacity onPress={IconButton} style={{ backgroundColor: 'red', }}>
                <IconButton name={'add'} size={32} color={'white'} />
            </TouchableOpacity>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', alignItems: 'center', flex: 1,
        backgroundColor: COLORS.secondary,
        padding: 10,
        height: 60,
        justifyContent: 'center',
        flex: 1
    }

});

export default SublistItem;