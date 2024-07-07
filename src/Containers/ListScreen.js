import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import Screen from './Screen';
import AppText from 'Components/AppText';
import Header from 'Components/Header/Header';
import IconButton from 'Components/Buttons/IconButton';


function ListScreen({ navigation, route }) {
    const { title } = route.params
    return (
        <Screen style={styles.container}>
            <Header title={title}
                leftItem={
                    <IconButton name={'chevron-back'} size={32} color='white' onPress={() => navigation.pop()} />
                }
                rightItem={
                    <IconButton name={'ellipsis-horizontal'} size={32} color='white' onPress={() => navigation.pop()} />
                }
            />

        </Screen>


    );
}

const styles = StyleSheet.create({

});

export default ListScreen;