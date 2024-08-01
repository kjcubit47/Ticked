import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import IconButton from './Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';




function SublistItem({ style, onPress, refresh, item }) {
    const [itemComplete, setItemComplete] = useState(item.complete)
    const [itemImportant, setItemImportant] = useState(item.important)
    const dispatch = useDispatch()

    const renderRightActions = (
        dispatch,
        item
    ) => {

        return (
            <Animated.View style={{ justifyContent: 'center', backgroundColor: COLORS.danger }}>
                <IconButton
                    name='trash'
                    onPress={() => {
                        refresh()
                        dispatch({ type: "DELETE_SUBLIST_ITEM", payload: { parentId: item.parentId, itemId: item.id } })
                    }} />

            </Animated.View>
        );
    };


    return (
        <Swipeable
            renderRightActions={() => renderRightActions(dispatch, item)}
            friction={2}
            overshootRight={false}
        >

            <TouchableOpacity style={styles.container} onPress={onPress}>
                <IconButton
                    onPress={
                        () => {

                            setItemImportant(!itemImportant);
                            dispatch({ type: 'SET_SUBLIST_IMPORTANT', payload: { parentId: item.parentId, itemId: item.id, important: !itemImportant } })
                            refresh();
                        }
                    }
                    style={styles.iconLeft}
                    name={itemImportant == true ? 'star' : 'star-outline'}
                    color={itemImportant == true ? 'yellow' : COLORS.light} />
                <Text style={STYLES.Text}>{item.title}</Text>
                <IconButton
                    onPress={
                        () => {
                            setItemComplete(!itemComplete);
                            console.log({ parentId: item.parentId, itemId: item.id, complete: !itemComplete })
                            dispatch({ type: 'SET_ITEM_COMPLETE', payload: { parentId: item.parentId, itemId: item.id, complete: !itemComplete } })
                            refresh();
                        }
                    }
                    style={styles.iconRight}
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
    iconRight: {
        position: 'absolute',
        right: 10
    },
    iconLeft: {
        position: 'absolute',
        left: 10
    }

});

export default SublistItem;