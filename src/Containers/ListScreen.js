import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, STYLES } from 'Constants';
import Screen from './Screen';
import AppText from 'Components/AppText';
import Header from 'Components/Header/Header';
import IconButton from 'Components/Buttons/IconButton';
import store from 'Redux/Store';
import { useDispatch } from 'react-redux';
import FlatListItem from 'Components/FlatListItem';
import AddTaskInput from 'Components/AddTaskInput';

function ListScreen({ navigation, route }) {
    // Route Parameters : 
    // item : the selected list data
    // refresh : utility/workaround for flatlist refreshing
    const { itemId, refresh } = route.params
    const [listSaved, setListSaved] = useState(false)
    const [listName, setListName] = useState('')
    const [listRefresher, setListRefresher] = useState(false)
    const [newTask, setNewTask] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const dispatch = useDispatch()
    const [stateLists, setStateLists] = useState(store.getState().listReducer.lists)
    const [thisList, setThisList] = useState({ id: -1, title: '', sublist: [] })

    useEffect(() => {
        setStateLists(store.getState().listReducer.lists)
        if (itemId != null) {
            // thisList = stateLists[itemId]
            setThisList({ ...stateLists[itemId] })
            setListSaved(true)
        } else if (listSaved == true) {
            // thisList = stateLists[stateLists.length]
            setThisList({ ...stateLists[stateLists.length] })
        }
        setListRefresher(!listRefresher)

    }, [listSaved, listName,])

    function childRefresher() {
        setListRefresher(!listRefresher)
    }



    return (
        <Screen style={styles.container}>
            <Header
                leftItem={
                    <IconButton name={'chevron-back'}
                        size={32}
                        color='white'
                        onPress={() => navigation.navigate("HomeScreen", { refresh: !refresh })}
                    />
                }
                centerItem={
                    <TextInput
                        onBlur={() => {
                            if (listName == '' || listName == null) {
                                setListRefresher(!listRefresher)
                            }
                            else if (!listSaved) {
                                setListSaved(true)
                                dispatch({ type: "ADD_LIST", payload: { title: listName, id: stateLists.length, sublist: [] } })
                                setListRefresher(!listRefresher)
                            }
                            else {
                                setListRefresher(!listRefresher)
                                dispatch({ type: "UPDATE_LIST_NAME", payload: { id: itemId, title: listName } })
                            }

                        }}
                        autoFocus={listName == '' || itemId == null}
                        defaultValue={thisList.id == -1 ? '' : thisList.title}
                        autoComplete='false'
                        style={STYLES.TextInput}
                        onChangeText={(text) => {
                            setListName(text);
                        }}
                    />
                }
                rightItem={
                    < IconButton
                        name={'ellipsis-horizontal'}
                        size={32}
                        color='white'
                        onPress={() => navigation.navigate("HomeScreen", { refresh: !refresh })}
                    />
                }
            />
            <View style={{ flex: 1 }}>
                {/* {listObj.id ?
                    <FlatList
                        data={store.getState().listReducer.lists[listObj.id].sublists}
                        renderItem={(item) => {
                            <View style={{ backgroundColor: 'red', flex: 1 }}></View>
                        }}
                    /> :

                }
 */}
                {/* <FlatList
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<FlatListItem title={"Create your first list"} onPress={() => { navigation.navigate("ListScreen", { item: {}, refresh, newList: true }); }} />}

                    data={listState.sublist}
                    extraData={listRefresher}
                    renderItem={({ item }) => <FlatListItem title={item.title} />}

                /> */}

            </View>
            {/* {thisList.id == -1 ? <AddTaskInput disabled={true} listRefresher={listRefresher} setListRefresher={childRefresher} /> :

            } */}
            {/* <AddTaskInput disabled={!listSaved} parentId={thisList.id} listRefresher={listRefresher} setListRefresher={childRefresher} /> */}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.container,]}
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
                            if (listSaved) {

                                setInputFocused(true)
                                setListRefresher(!listRefresher)
                            }

                        }}
                        onBlur={() => {
                            if (listSaved) {

                                setInputFocused(false)
                                setNewTask('')
                                setListRefresher(!listRefresher)
                            }

                        }}
                        onSubmitEditing={() => {
                            if (listSaved) {

                                setInputFocused(false)
                                console.log("title : ", newTask, "\nid : ", thisList.sublist, "\nparentId: ", thisList.id)
                                // dispatch({ type: "ADD_SUBLIST_ITEM", payload: { title: newTask, id: thisList.sublist, parentId: itemId } })
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
            </KeyboardAvoidingView>


        </Screen >

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
export default ListScreen;