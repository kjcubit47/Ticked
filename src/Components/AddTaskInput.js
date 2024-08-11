import { COLORS, STYLES } from 'Constants';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import IconButton from './Buttons/IconButton';

import { useDispatch, useSelector } from 'react-redux';
import { ScreenDimensions } from 'util';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { schedulePushNotification } from 'Notifications';

function AddTaskInput({ parentId, listIndex, style }) {
    let listStates = useSelector((state) => state.listReducer)
    const stateIdCount = useSelector((state) => state.listReducer.idCount)
    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState('')
    const [inputFocused, setInputFocused] = useState(false)

    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const [date, setDate] = useState(null)
    const [timePickerVisible, setTimePickerVisible] = useState(false)
    const [time, setTime] = useState(null)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={
                [
                    styles.container,
                    style
                ]
            }
        >
            <View style={{ backgroundColor: COLORS.secondary, alignItems: 'center', flexDirection: 'row', marginTop: 5, marginBottom: 15, borderRadius: 10 }}>
                <TextInput
                    editable={listStates.lists[listIndex] != undefined}
                    placeholder='Add an item'
                    placeholderTextColor={'white'}
                    autoCorrect={false}

                    style={[STYLES.TextInput, styles.textBox]}
                    onChangeText={(text) => {
                        setNewTask(text)

                    }}

                    onFocus={() => {
                        if (listStates.lists[listIndex]) {
                            setInputFocused(true)
                        }

                    }}
                    onBlur={() => {
                        if (listStates.lists[listIndex]) {

                            setInputFocused(false)
                            setNewTask('')
                        }

                    }}
                    onSubmitEditing={async () => {
                        if (listStates.lists[listIndex]) {
                            setInputFocused(false)
                            let dateId, timeId = null
                            if (date != null && date.getDate() - new Date().getDate() > 0) {
                                try {
                                    dateId = await schedulePushNotification(newTask, "A task is due!", {}, { date: date.getDate() })
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            if (time != null && time.getMinutes() - new Date().getMinutes() > 0) {
                                try {
                                    timeId = await schedulePushNotification(newTask, "A task is due!", {}, { minute: time.getMinutes(), hour: time.getHours() })
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            dispatch({
                                type: "ADD_SUBLIST_ITEM",
                                payload: {
                                    title: newTask == '' ? 'Untitled' : newTask,
                                    id: stateIdCount,
                                    parentId: parentId,
                                    note: '',
                                    complete: false,
                                    important: false,
                                    dueDate: JSON.parse(JSON.stringify(date)),
                                    dueTime: JSON.parse(JSON.stringify(time)),
                                    notificationDateId: dateId ? dateId : null,
                                    notificationTimeId: timeId ? timeId : null,
                                    createdAt: new Date().getTime()
                                }
                            })
                            setNewTask('')
                            setDate(null)
                            setTime(null)
                        }
                    }}
                />
                {
                    inputFocused ?
                        <IconButton size={32}
                            name={'square-outline'} color={COLORS.white} />
                        :
                        <IconButton size={32}
                            name={'add'} color={COLORS.white} />
                }
            </View>

            {inputFocused &&
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'flex-start', height: ScreenDimensions.height * 0.06, alignItems: 'flex-start' }}>
                    <IconButton size={32} name={'calendar'} color={COLORS.white}
                        onPress={() => {
                            setDatePickerVisible(true)
                        }}
                    />
                    <IconButton size={32} name={'alarm'} color={COLORS.white}
                        onPress={() => {
                            setTimePickerVisible(true)
                        }}
                    />


                </View>
            }
            <DateTimePicker
                isVisible={datePickerVisible}
                date={new Date()}
                onConfirm={(newDate) => {
                    setDate(newDate)
                    setDatePickerVisible(false)
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
                }}
                onCancel={() => {
                    setTime(null)
                    setTimePickerVisible(false)
                }}
                mode='time'
            />
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        padding: 10,

    },
    textBox: { margin: 10, backgroundColor: COLORS.secondary, color: COLORS.white, }
});

export default AddTaskInput;