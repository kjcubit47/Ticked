import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
function IconButton({ onPress, name, size, color }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={name} size={size} color={color}></Ionicons>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {}
});

export default IconButton;