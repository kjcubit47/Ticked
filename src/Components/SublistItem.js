import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import IconButton from './Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';




function SublistItem({ style, onPress, refresh, item }) {
    const stateItem = useSelector(state => state.listReducer.lists[item.parentId].sublist[item.id])
    // const [itemComplete, setItemComplete] = useState(item.complete)
    // const [itemImportant, setItemImportant] = useState(item.important)
    const [itemComplete, setItemComplete] = useState(stateItem.complete)
    const [itemImportant, setItemImportant] = useState(stateItem.important)

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
                    name={stateItem.important == true ? 'star' : 'star-outline'}
                    color={stateItem.important == true ? 'yellow' : COLORS.light} />
                <Text style={STYLES.Text}>{item.title}</Text>
                <IconButton
                    onPress={
                        () => {
                            setItemComplete(!itemComplete);
                            dispatch({ type: 'SET_ITEM_COMPLETE', payload: { parentId: item.parentId, itemId: item.id, complete: !itemComplete } })
                            refresh();
                        }
                    }
                    style={styles.iconRight}
                    name={stateItem.complete == true ? 'checkmark' : 'square-outline'} />

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