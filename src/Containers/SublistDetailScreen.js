import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from './Screen';
import Header from 'Components/Header/Header';
import IconButton from 'Components/Buttons/IconButton';
import { COLORS, STYLES } from 'Constants';
import { useDispatch } from 'react-redux';
import AppText from 'Components/AppText';
import { TextInput } from 'react-native-gesture-handler';
import { ScreenDimensions } from 'util';

function SublistDetailScreen({ navigation, route, style }) {
    const { item } = route.params
    const [itemComplete, setItemComplete] = useState(item.complete)
    const [itemImportant, setItemImportant] = useState(item.important)
    const [notesText, setNotesText] = useState(item.note)
    const dispatch = useDispatch()
    return (
        <Screen style={[styles.container, style]}>
            <Header
                leftItem={<IconButton
                    name='chevron-back'
                    onPress={() => {
                        navigation.pop()
                    }}
                />}
                style={{ height: '5%' }}
            />

            <View style={{
                backgroundColor: COLORS.primary, padding: 5, paddingBottom: 10, flexDirection: 'row', padding: 10,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <IconButton
                    onPress={
                        () => {
                            setItemImportant(!itemImportant);
                            dispatch({ type: 'SET_SUBLIST_IMPORTANT', payload: { parentId: item.parentId, itemId: item.id, important: !itemImportant } })
                        }
                    }
                    style={{
                        position: 'absolute',
                        left: 10
                    }}
                    name={itemImportant == true ? 'star' : 'star-outline'}
                    color={itemImportant == true ? 'yellow' : COLORS.light} />

                <AppText style={itemComplete ? { textDecorationLine: 'line-through', } : {}}>{item.title}</AppText>

                <IconButton
                    onPress={
                        () => {
                            setItemComplete(!itemComplete);
                            dispatch({ type: 'SET_ITEM_COMPLETE', payload: { parentId: item.parentId, itemId: item.id, complete: !itemComplete } })
                        }
                    }
                    style={{
                        position: 'absolute',
                        right: 10
                    }}
                    name={itemComplete == true ? 'checkmark' : 'square-outline'} />

            </View>
            <View style={{ padding: 10 }}>
                <AppText style={{ textAlign: 'left', }}>Notes</AppText>
                <TextInput multiline
                    defaultValue={notesText}
                    onChangeText={(text) => { setNotesText(text) }}
                    blurOnSubmit={true}
                    onBlur={() => {
                        dispatch({ type: "SET_SUBLIST_NOTE", payload: { parentId: item.parentId, itemId: item.id, note: notesText } })
                    }}
                    style={styles.textInput} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.flatListBackground
    },
    textInput: {
        backgroundColor: COLORS.secondary,
        color: COLORS.light,
        fontSize: 20,
        padding: 5,
        height: ScreenDimensions.height * 0.2,
        maxHeight: ScreenDimensions.height * 0.2,
    }
});

export default SublistDetailScreen;