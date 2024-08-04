import { COLORS, STYLES } from 'Constants';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import IconButton from './Buttons/IconButton';
import { isAndroid } from '../util';
import store from 'Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
function AddTaskInput({ parentId, style }) {
    let listStates = useSelector((state) => state.listReducer)

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
                    editable={listStates.lists[parentId] != undefined}
                    placeholder='Add an item'
                    placeholderTextColor={'white'}
                    style={[STYLES.TextInput, styles.textBox]}
                    onChangeText={(text) => {
                        setNewTask(text)

                    }}

                    onFocus={() => {
                        if (listStates.lists[parentId]) {
                            setInputFocused(true)
                        }

                    }}
                    onBlur={() => {
                        if (listStates.lists[parentId]) {

                            setInputFocused(false)
                            setNewTask('')
                        }

                    }}
                    onSubmitEditing={() => {
                        if (listStates.lists[parentId]) {

                            setInputFocused(false)
                            dispatch({
                                type: "ADD_SUBLIST_ITEM",
                                payload: {
                                    title: newTask,
                                    id: listStates.lists[parentId].sublist.length,
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
                <View style={{ flexDirection: 'row', backgroundColor: COLORS.danger, width: '90%' }}>
                    <IconButton size={32} name={'add'} color={COLORS.white} />
                    <IconButton size={32} name={'add'} color={COLORS.white} />
                    <IconButton size={32} name={'add'} color={COLORS.white} />

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