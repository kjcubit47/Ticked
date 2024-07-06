import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Modal } from 'react-native';
import Screen from './Screen';
import FlatListItem from 'Components/FlatListItem';
import Header from 'Components/Header/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButton from 'Components/Buttons/IconButton';



function HomeScreen({ navigation }) {

    const [lists, setLists] = useState([{ title: "Create your first list", id: 0 }])
    const createNewList = () => {
        // setLists(
        //     [...lists,
        //     {

        //     }
        //     ]
        // )
    }

    return (
        <Screen >
            <Header title={" Home "} leftItem={

                <IconButton onPress={createNewList} name="add" size={32} color="white" />

            } ></Header >
            <View>
                <FlatList renderItem={({ item }) => <FlatListItem onPress={() => navigation.navigate("ListScreen", { title: item.title, })} title={item.title} />} data={lists} />
            </View>
        </Screen >
    );
}



export default HomeScreen;