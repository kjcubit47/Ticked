import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from 'Constants';

function ListSeparator({ style }) {
    return (
        <View style={[{
            height: 1,
            width: '100%',
            backgroundColor: COLORS.light,

        }, style]} />);
}

export default ListSeparator;