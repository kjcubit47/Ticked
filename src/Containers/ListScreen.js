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


function ListScreen({ navigation, route }) {
    let listStates = useSelector((state) => state.listReducer)

    // Route Parameters : 
    // item : the selected list data
    // refresh : utility/workaround for flatlist refreshing
    const { itemId, refresh } = route.params
    const [listName, setListName] = listStates.lists[itemId] ? useState(listStates.lists[itemId].title) : useState('')
    const [listRefresher, setListRefresher] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch();

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
                            if (listName == '') {

                            }
                            else if (listStates.lists[itemId]) {
                                dispatch({ type: "UPDATE_LIST_NAME", payload: { id: itemId, title: listName } })
                            }
                            else {
                                dispatch({ type: "ADD_LIST", payload: { title: listName, id: itemId, sublist: [] } })

                            }
                            setListRefresher(!listRefresher)
                        }}
                        autoFocus={listName == ''}
                        defaultValue={listName}

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
                        onPress={() => setModalVisible(true)}

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

            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                {/* flatlist here */}
                <FlatList
                    style={{ backgroundColor: COLORS.flatListBackground }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <>
                            <SublistItem
                                title={item.title}
                            />

                            <ListSeparator />
                        </>
                    }
                    data={listStates.lists[itemId] ? listStates.lists[itemId].sublist : []}
                    extraData={listRefresher}
                // ItemSeparatorComponent={<ListSeparator />}

                />
            </View>
            <AddTaskInput style={{ margin: 10 }} parentId={itemId} />

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
    textBox: { margin: 10, backgroundColor: COLORS.secondary, color: COLORS.white, }

});
export default ListScreen;