import React, { useState } from 'react';
import { View, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import Screen from './Screen';
import FlatListItem from 'Components/FlatListItem';
import Header from 'Components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from 'Components/Buttons/IconButton';
import AppButton from 'Components/Buttons/AppButton';
import { COLORS } from 'Constants';

import { isAndroid } from 'util';

const deleteList = () => {

}

function HomeScreen({ navigation }) {
    const createNewList = () => {
        setListCount(listCount + 1)
        setLists(
            [...lists,
            {
                title: modalInput,
                id: listCount + 1
            }
            ]
        )
        setModalVisible(!modalVisible)
        setModalInput('')
    }
    const [listCount, setListCount] = useState(0);
    const [lists, setLists] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInput, setModalInput] = useState('')

    return (

        <Screen >

            {/* Header */}
            <Header
                title={" Home "}

                rightItem={
                    <IconButton onPress={() => {
                        setModalVisible(true);
                    }} name="add" size={32} color="white" />
                }
            />



            {/* List */}
            <View>
                <FlatList
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <FlatListItem onPress={() => navigation.navigate("ListScreen", { title: item.title, })} title={item.title} />}
                    data={lists}

                    ItemSeparatorComponent={<View style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: COLORS.light,
                    }} />}
                    ListEmptyComponent={<FlatListItem title={"Create your first list"} onPress={() => setModalVisible(!modalVisible)} />}
                />
            </View>


            {/* Modal */}

            <Modal animationType='slide' presentationStyle='pageSheet' visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Screen style={styles.modal}>

                    {isAndroid() &&
                        <View style={styles.androidHeader}>
                            <IconButton size={32} name="close" onPress={() => { setModalInput(""); setModalVisible(!modalVisible) }} />
                        </View>
                    }

                    <TextInput keyboardType='default' style={styles.modalInput} onChangeText={setModalInput} />
                    <AppButton onPress={createNewList} title="Create List"></AppButton>
                </Screen>
            </Modal>


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