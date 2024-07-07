import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
function IconButton({ onPress, name, size, color, style }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons style={[{ paddingHorizontal: 10 }, style]} name={name} size={size} color={color}></Ionicons>
        </TouchableOpacity>
    );
}

export default IconButton;