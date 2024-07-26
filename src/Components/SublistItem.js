import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import IconButton from './Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';
import { Swipeable } from 'react-native-gesture-handler';

const renderRightActions = (
    progress,
    dragAnimatedValue
) => {
    const opacity = dragAnimatedValue.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View style={{ justifyContent: 'center', backgroundColor: COLORS.danger }}>
            <TouchableOpacity>
                <IconButton size={32} color={COLORS.light} name='trash' />
            </TouchableOpacity>
        </Animated.View>
    );
};


function SublistItem({ title, complete, completeable, style, onPress, IconOnPress, parentId, itemId }) {
    return (
        <Swipeable
            renderRightActions={renderRightActions}
            friction={2}
            overshootRight={false}
        >

            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{ flex: 1 }}>
                    <Text style={STYLES.Text}>{title}</Text>

                </View>
                {completeable && !complete &&
                    <TouchableOpacity onPress={IconOnPress} style={styles.iconButtons}>
                        <IconButton name={'square-outline'} size={32} color={'white'} />
                    </TouchableOpacity>
                }
                {completeable && complete &&
                    <TouchableOpacity onPress={IconOnPress} style={styles.iconButtons}>
                        <IconButton name={'checkmark'} size={32} color={'white'} />
                    </TouchableOpacity>
                }

            </TouchableOpacity>
        </Swipeable>

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
    },
    iconButtons: {
        position: 'absolute',
        right: 10
    }

});

export default SublistItem;