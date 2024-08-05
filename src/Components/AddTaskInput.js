import { COLORS, STYLES } from 'Constants';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import IconButton from './Buttons/IconButton';

import { useDispatch, useSelector } from 'react-redux';
import { ScreenDimensions } from 'util';

function AddTaskInput({ parentId, listIndex, style }) {
    let listStates = useSelector((state) => state.listReducer)
    const stateIdCount = useSelector((state) => state.listReducer.idCount)
    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
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
                    onSubmitEditing={() => {
                        if (listStates.lists[listIndex]) {

                            setInputFocused(false)
                            dispatch({
                                type: "ADD_SUBLIST_ITEM",
                                payload: {
                                    title: newTask,
                                    id: stateIdCount,
                                    parentId: parentId,
                                    note: '',
                                    complete: false,
                                    important: false,
                                    createdAt: new Date().getTime()
                                }
                            })
                            setNewTask('')
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
                    <IconButton size={32} name={'calendar'} color={COLORS.white} />
                    {/* <IconButton size={32} name={'add'} color={COLORS.white} />
                    <IconButton size={32} name={'add'} color={COLORS.white} /> */}

                </View>
            }

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