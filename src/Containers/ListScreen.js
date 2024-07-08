import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';

import Screen from './Screen';
import AppText from 'Components/AppText';
import Header from 'Components/Header/Header';
import IconButton from 'Components/Buttons/IconButton';
import { STYLES } from 'Constants';
import store from 'Redux/Store';
import { useDispatch } from 'react-redux';


function ListScreen({ navigation, route }) {
    const { item, refresh } = route.params
    const lists = store.getState().listReducer.lists
    const listCount = store.getState().listReducer.listCount
    const dispatch = useDispatch()
    const [listName, setListName] = useState(item.title)

    return (
        <Screen style={styles.container}>
            <Header title={item.title}
                leftItem={
                    <IconButton name={'chevron-back'} size={32} color='white' onPress={() => navigation.navigate("HomeScreen", { refresh: !refresh })} />
                }
                centerItem={
                    <TextInput onBlur={() => { setListName(listName); dispatch({ type: "ADD_LIST", payload: { title: listName, id: listCount } }); }} autoFocus={item.title != ''} defaultValue={item.title} autoComplete='false' style={STYLES.TextInput} onChangeText={(text) => { setListName(text) }} />
                }
                rightItem={
                    < IconButton name={'ellipsis-horizontal'} size={32} color='white' onPress={() => navigation.navigate("HomeScreen")} />
                }
            />

        </Screen >


    );
}

const styles = StyleSheet.create({

});

export default ListScreen;