import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from 'Constants';
function IconButton({ onPress, name, size = 32, color = COLORS.light, style }) {
    return (
        <TouchableOpacity style={[{ paddingHorizontal: 10 }, style]} onPress={onPress}>
            <Ionicons name={name} size={size} color={color}></Ionicons>
        </TouchableOpacity>
    );
}

export default IconButton;