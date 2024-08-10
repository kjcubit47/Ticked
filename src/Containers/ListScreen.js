import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, STYLES } from 'Constants';
import Screen from './Screen';
import Header from 'Components/Header/Header';
import IconButton from 'Components/Buttons/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import FlatListItem from 'Components/FlatListItem';
import AddTaskInput from 'Components/AddTaskInput';
import ListSeparator from 'Components/ListSeparator';

import ListSettingsModal from 'Components/Modals/ListSettingsModal';
import SublistItem from 'Components/SublistItem';
import { isAndroid } from 'util';
import { getAllScheduledNotificationsAsync } from 'expo-notifications';


function ListScreen({ navigation, route, refreshFromChild }) {

    useEffect(() => {
        async function test() {
            let nots = await getAllScheduledNotificationsAsync()
            // console.log(nots)
            return nots
        }
        test().then((pp) => {
            pp.forEach((cir) => {
                console.log(cir.content.title)
                console.log(cir.trigger.dateComponents)
            })
        })
    })

    let listStates = useSelector((state) => state.listReducer)

    // Route Parameters : 
    // item : the selected list data
    // refresh : utility/workaround for flatlist refreshing
    const { itemId, refresh } = route.params
    const [listNameFocused, setListNameFocused] = useState(false)
    const index = listStates.lists.findIndex((curr) => {
        return itemId == curr.id
    })
    const [listName, setListName] = listStates.lists[index] ? useState(listStates.lists[index].title) : useState('')
    const [listRefresher, setListRefresher] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch();


    function refreshForChild() {
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
                            setListNameFocused(false)
                            if (listName == '') {

                            }
                            else if (listStates.lists[itemId]) {
                                dispatch({ type: "UPDATE_LIST_NAME", payload: { id: itemId, title: listName } })
                            }
                            else {
                                dispatch({ type: "ADD_LIST", payload: { title: listName, id: itemId, sublist: [] } })
                                setListName(listName)
                            }
                            setListRefresher(!listRefresher)
                        }}
                        onFocus={() => setListNameFocused(true)}
                        autoFocus={listName === ''}
                        defaultValue={listName}
                        autoComplete='false'
                        style={[STYLES.TextInput, {
                            marginBottom: (isAndroid() && listNameFocused) ? 10 : 0,
                        }]}
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
                        onPress={() => setModalVisible(true)}
                    />
                }
            />

            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                {/* flatlist here */}
                <FlatList

                    style={{ backgroundColor: COLORS.flatListBackground }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <>
                            <SublistItem
                                item={item}
                                refresh={refreshForChild}
                                onPress={() => { navigation.navigate("SublistDetailScreen", { item: item }) }}
                            />

                            <ListSeparator />
                        </>
                    }
                    data={listStates.lists[index] ? listStates.lists[index].sublist : []}
                    extraData={listRefresher}
                // ItemSeparatorComponent={<ListSeparator />}

                />
            </View>
            <AddTaskInput style={{ margin: 10 }} parentId={itemId} listIndex={index} />

            <ListSettingsModal
                refresh={listRefresher}
                setRefresh={setListRefresher}
                navigation={navigation}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                listId={itemId}
            />

        </Screen >

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        // padding: 10,

    },
    textBox: { margin: 10, backgroundColor: COLORS.secondary, color: COLORS.white, },

});

export default ListScreen;