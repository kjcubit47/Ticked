import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import IconButton from './Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSublistItemNotification } from 'Notifications/Actionhelpers';




function SublistItem({ style, onPress, refresh, item }) {

    const state = useSelector(state => state.listReducer)

    let index1 = state.lists.findIndex((current) => {
        return item.parentId == current.id
    })
    let index2 = state.lists[index1].sublist.findIndex((current) => {
        return item.id == current.id
    })
    // const stateItem = useSelector(state => state.listReducer.lists[item.parentId].sublist[item.id])
    const stateItem = useSelector(state => state.listReducer.lists[index1].sublist[index2])
    const [itemComplete, setItemComplete] = useState(stateItem.complete)
    const [itemImportant, setItemImportant] = useState(stateItem.important)
    useEffect(() => {
        setItemComplete(stateItem.complete)
        setItemImportant(stateItem.important)
    })
    const dispatch = useDispatch()

    const renderRightActions = (
        dispatch,
        item
    ) => {

        return (
            <Animated.View style={{ justifyContent: 'center', backgroundColor: COLORS.danger }}>
                <IconButton
                    name='trash'
                    onPress={async () => {
                        await deleteSublistItemNotification(item.id, item.parentId)
                        dispatch({ type: "DELETE_SUBLIST_ITEM", payload: { parentId: item.parentId, itemId: item.id } })
                        refresh()
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
                <Text style={stateItem.complete == true ? STYLES.ListTextComplete : STYLES.Text}>{item.title}</Text>
                <IconButton
                    onPress={
                        async () => {
                            if (!itemComplete) {
                                await deleteSublistItemNotification(item.id, item.parentId)
                            }
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