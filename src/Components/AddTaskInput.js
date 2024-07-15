import { COLORS, STYLES } from 'Constants';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import IconButton from './Buttons/IconButton';
import { isAndroid } from '../util';
import store from 'Redux/Store';
import { useDispatch } from 'react-redux';
function AddTaskInput({ parentId, listRefresher, setListRefresher, disabled }) {
    useEffect(() => {
        console.log(parentId)
    }, [parentId, disabled])
    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const subListCount = store.getState().listReducer.subListCount
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={
                [
                    styles.container,

                ]
            }
        >
            <View style={{ backgroundColor: COLORS.secondary, alignItems: 'center', flexDirection: 'row', marginTop: 5, marginBottom: 15, borderRadius: 10 }}>
                <TextInput
                    placeholder='Add an item'
                    placeholderTextColor={'white'}
                    style={[STYLES.TextInput, styles.textBox]}
                    onChangeText={(text) => {
                        setNewTask(text)
                        setListRefresher(!listRefresher)

                    }}
                    onFocus={() => {
                        if (!disabled) {

                            setInputFocused(true)
                            setListRefresher(!listRefresher)
                        }

                    }}
                    onBlur={() => {
                        if (!disabled) {

                            setInputFocused(false)
                            setNewTask('')
                            setListRefresher(!listRefresher)
                        }

                    }}
                    onSubmitEditing={() => {
                        if (!disabled) {

                            setInputFocused(false)
                            dispatch({ type: "ADD_SUBLIST_ITEM", payload: { title: newTask, id: subListCount, parentId: parentId } })
                            setNewTask('')
                            setListRefresher(!listRefresher)
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

            {inputFocused && !disabled &&
                <View style={{ flexDirection: 'row', backgroundColor: 'red', width: '90%' }}>
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
    textBox: { margin: 10, backgroundColor: COLORS.secondary, color: 'white', }
});

export default AddTaskInput;