import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from "react-native-modal"
import ModalView from './ModalView';
import AppButton from 'Components/Buttons/AppButton';
import { COLORS, STYLES } from 'Constants';
import { useDispatch } from 'react-redux';

function ListSettingsModal({ modalVisible, setModalVisible, listId, navigation, setRefresh, refresh }) {

    const dispatch = useDispatch()

    return (
        <Modal

            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            isVisible={modalVisible}
            swipeDirection='right'
            backdropOpacity={.4}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            style={styles.container}
        >
            <View style={styles.modalView}>

                <AppButton title={"List Color"}
                    style={STYLES.SettingsModalButton}
                />
                <AppButton
                    title={"Delete List"}
                    textStyle={{ color: COLORS.danger }}
                    style={STYLES.SettingsModalButton}
                    onPress={() => {
                        dispatch({ type: "DELETE_LIST", payload: listId })
                        setRefresh(!refresh)
                        navigation.navigate("HomeScreen", { refresh: !refresh })
                    }}
                />
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', flex: 1, position: 'relative',
    },
    modalView: {
        width: '80%',
        height: '40%',
        alignItems: 'center',
        opacity: 0.8,
        padding: 10
    }
});

export default ListSettingsModal;