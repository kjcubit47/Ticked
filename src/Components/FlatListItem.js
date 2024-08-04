import { STYLES } from 'Constants';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from 'Constants';
import { useDispatch } from 'react-redux';
import IconButton from './Buttons/IconButton';
import { Swipeable } from 'react-native-gesture-handler';
function FlatListItem({ title, id, onPress, style, parentStyle }) {


    const dispatch = useDispatch()


    const renderRightActions = (
        dispatch,
        id
    ) => {

        return (
            <Animated.View style={{ justifyContent: 'center', backgroundColor: COLORS.danger }}>
                <IconButton
                    name='trash'
                    onPress={() => {
                        dispatch({ type: "DELETE_LIST", payload: id })
                    }} />

            </Animated.View>
        );
    };


    return (
        <Swipeable
            renderRightActions={() => renderRightActions(dispatch, id)}
            friction={2}
            overshootRight={false}
        >

            <TouchableOpacity style={[parentStyle, { flex: 1 }]} onPress={onPress}>

                <View style={[styles.item, style]}>
                    <Text style={STYLES.Text}>{title}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        padding: 10,
        height: 60,
        justifyContent: 'center'
    }
});

export default FlatListItem;