import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from './Screen';
import Header from 'Components/Header/Header';
import IconButton from 'Components/Buttons/IconButton';
import { COLORS } from 'Constants';

function SublistDetailScreen({ navigation, route }) {
    const { item } = route.params
    return (
        < Screen >
            <Header
                leftItem={<IconButton
                    name='chevron-back'
                    size={32}
                    color={COLORS.light}
                    onPress={() => {
                        navigation.pop()
                    }}
                />}
                title={item && item.title}
            />
        </Screen >
    );
}

const styles = StyleSheet.create({
    container: {}
});

export default SublistDetailScreen;