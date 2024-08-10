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
import DateTimePicker from 'react-native-modal-datetime-picker';

function SublistDetailScreen({ navigation, route, style }) {
    const { item } = route.params
    const [itemTitle, setItemTitle] = useState(item.title)
    const [itemComplete, setItemComplete] = useState(item.complete)
    const [itemImportant, setItemImportant] = useState(item.important)
    const [notesText, setNotesText] = useState(item.note)
    const [date, setDate] = useState(item.dueDate)
    const [time, setTime] = useState(item.dueTime)
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const [timePickerVisible, setTimePickerVisible] = useState(false)
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

                <AppText style={itemComplete ? STYLES.ListTextComplete : STYLES.Text}></AppText>
                <TextInput style={itemComplete ? STYLES.ListTextComplete : STYLES.Text}
                    editable={!itemComplete}
                    defaultValue={item.title}
                    onChangeText={(text) => {
                        setItemTitle(text)
                    }}
                    blurOnSubmit={true}
                    onBlur={() => {
                        dispatch({ type: "SET_SUBLIST_TITLE", payload: { parentId: item.parentId, id: item.id, title: itemTitle } })
                    }}
                    onSubmitEditing={() => {

                    }}
                />
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
            <View style={{ justifyContent: 'center', paddingTop: 10 }}>

                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <IconButton name={"calendar"} onPress={() => {
                        setDatePickerVisible(true)
                    }} />
                    {date != null &&
                        <AppText>{new Date(date).toUTCString().substring(0, 16)}</AppText>
                    }
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <IconButton name={"alarm"} onPress={() => setTimePickerVisible(true)} />
                    {time != null &&
                        <AppText>{new Date(time).getHours() % 12 + ":" + new Date(time).getMinutes()}</AppText>
                    }
                </View>
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
            <DateTimePicker
                isVisible={datePickerVisible}
                date={new Date()}
                onConfirm={(newDate) => {
                    setDate(newDate)
                    setDatePickerVisible(false)
                    dispatch({
                        type: "SET_SUBLIST_DUE_DATE", payload: {
                            itemId: item.id,
                            parentId: item.parentId,
                            dueDate: newDate.toISOString()
                        }
                    })
                }}
                onCancel={() => {
                    setDate(null)
                    setDatePickerVisible(false)
                }}
                mode='date'
            />

            <DateTimePicker
                isVisible={timePickerVisible}
                date={new Date()}
                onConfirm={(newTime) => {
                    setTime(newTime)
                    setTimePickerVisible(false)
                    dispatch({
                        type: "SET_SUBLIST_DUE_TIME", payload: {
                            itemId: item.id,
                            parentId: item.parentId,
                            dueTime: newTime.toISOString()
                        }
                    })
                }}
                onCancel={() => {
                    setTime(null)
                    setTimePickerVisible(false)
                }}
                mode='time'
            />
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