import React, { useEffect, useState } from 'react';
import { View, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import Screen from './Screen';
import FlatListItem from 'Components/FlatListItem';
import Header from 'Components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from 'Components/Buttons/IconButton';
import AppButton from 'Components/Buttons/AppButton';
import { COLORS } from 'Constants';
import store from 'Redux/Store';
import ListSeparator from 'Components/ListSeparator';
import { genericLists } from 'util';


function HomeScreen({ navigation, refreshFromChild }) {

    const [refresh, setRefresh] = useState(false)
    if (refreshFromChild != null) {
        setRefresh(refreshFromChild)
    }
    let lists = store.getState().listReducer.lists


    return (

        <Screen  >

            {/* Header */}
            <Header
                title={" My Lists "}
                rightItem={
                    <IconButton
                        name="add"
                        size={32}
                        color="white"
                        onPress={() => {
                            navigation.navigate("ListScreen", { itemId: lists.length, refresh }); setRefresh(!refresh)
                        }}
                    />
                }
            />


            {/* List */}
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <FlatList
                    style={{ backgroundColor: COLORS.flatListBackground }}

                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <FlatListItem title={item.title}
                            onPress={() => {
                                navigation.navigate("ListScreen", { itemId: item.id, refresh }); setRefresh(!refresh)
                            }}
                        />}
                    data={lists}
                    extraData={refresh}
                    ItemSeparatorComponent={<ListSeparator />}
                    ListEmptyComponent={
                        <FlatListItem title={"Create your first list"}
                            onPress={() => {
                                navigation.navigate("ListScreen", { itemId: lists.length, refresh }); setRefresh(!refresh)
                            }}
                        />}
                />
            </View>

        </Screen >
    );
}

const styles = StyleSheet.create({
    androidHeader: {
        margin: 0,
        backgroundColor: COLORS.primary,
        height: '5%',


    },
    modalInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }

})


export default HomeScreen;