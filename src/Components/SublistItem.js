import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import IconButton from './Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';




function SublistItem({ title, complete, style, onPress, IconOnPress, parentId, itemId, refresh }) {
    const [itemComplete, setItemComplete] = useState(complete)
    const sublistState = useSelector(state => state.listReducer.lists[parentId].sublist)
    const dispatch = useDispatch()

    const renderRightActions = (
        dispatch,
        itemId,
    ) => {

        return (
            <Animated.View style={{ justifyContent: 'center', backgroundColor: COLORS.danger }}>
                <IconButton
                    name='trash'
                    onPress={() => {
                        refresh()
                        dispatch({ type: "DELETE_SUBLIST_ITEM", payload: { parentId: parentId, itemId: itemId } })
                    }} />

            </Animated.View>
        );
    };


    return (
        <Swipeable
            renderRightActions={() => renderRightActions(dispatch, parentId, itemId,)}
            friction={2}
            overshootRight={false}
        >

            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={{ flex: 1 }}>
                    <Text style={STYLES.Text}>{title}</Text>
                </View>
                <IconButton
                    onPress={
                        () => {

                            setItemComplete(!itemComplete);
                            dispatch({ type: 'SET_ITEM_COMPLETE', payload: { parentId, itemId, complete: !itemComplete } })
                            refresh();
                        }
                    }
                    style={styles.iconButtons}
                    name={itemComplete == true ? 'checkmark' : 'square-outline'} />

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