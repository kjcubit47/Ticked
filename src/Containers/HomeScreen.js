import React, { useEffect, useState } from 'react';
import { View, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import Screen from './Screen';
import FlatListItem from 'Components/FlatListItem';
import Header from 'Components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from 'Components/Buttons/IconButton';
import AppButton from 'Components/Buttons/AppButton';
import { COLORS } from 'Constants';

import { isAndroid } from 'util';
import { useDispatch, useSelector } from 'react-redux';
import store from 'Redux/Store';


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
                title={" Home "}
                rightItem={
                    <IconButton onPress={() => { navigation.navigate("ListScreen", { item: {}, refresh }); setRefresh(!refresh) }} name="add" size={32} color="white" />
                }
            />


            {/* List */}
            <View>
                <FlatList

                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FlatListItem title={item.title} onPress={() => { navigation.navigate("ListScreen", { item: item }, refresh); setRefresh(!refresh) }} />}
                    data={lists}
                    extraData={refresh}
                    ItemSeparatorComponent={<View style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: COLORS.light,
                    }} />}
                    ListEmptyComponent={<FlatListItem title={"Create your first list"} onPress={() => { navigation.navigate("ListScreen", { item: {}, refresh }); setRefresh(!refresh) }} />}
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