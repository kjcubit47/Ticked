import * as types from "../Redux/Actions/ActionTypes";
import * as Notifications from "expo-notifications"
import store from "Redux/Store";

export async function setSublistDueDate(payload) {
    const parentId = payload.parentId
    const id = payload.id

    const sublistIndex = getSublistIndex(id, parentId)

    return {
        type: types.SET_SUBLIST_DUE_DATE,
        payload: payload
    }
}
export async function setSublistDueTime(payload) {
    const parentId = payload.parentId
    const id = payload.id

    const sublistIndex = getSublistIndex(id, parentId)

    return {
        type: types.SET_SUBLIST_DUE_TIME,
        payload: payload
    }
}
export async function setSublistTitle(payload) {
    const parentId = payload.parentId
    const id = payload.id

    const sublistIndex = getSublistIndex(id, parentId)

    return {
        type: types.SET_SUBLIST_TITLE,
        payload: payload
    }
}
export async function setItemComplete(payload) {
    const parentId = payload.parentId
    const id = payload.id

    const sublistIndex = getSublistIndex(id, parentId)

    return {
        type: types.SET_ITEM_COMPLETE,
        payload: payload
    }
}
export async function deleteSublistItemNotification(payload) {
    const parentId = payload.parentId
    const id = payload.id

    const sublistIndex = getSublistIndex(id, parentId)


}

export async function deleteListNotifications(id) {
    const tempState = JSON.parse(JSON.stringify(store.getState().listReducer.lists))
    const index = getParentIndex(id)

    if (index != -1) {

        for (let i = 0; i < tempState[index].sublist.length; i++) {
            let current = tempState[index].sublist[i]
            if (tempState[index].sublist[i].notificationDateId != null) {
                await Notifications.cancelScheduledNotificationAsync(current.notificationDateId)
            }
            if (tempState[index].sublist[i].notificationTimeIdrrr != null) {
                await Notifications.cancelScheduledNotificationAsync(current.notificationTimeId)
            }

        }
    }

}

function getSublistIndex(id, parentId) {
    const tempState = JSON.parse(JSON.stringify(store.getState().listReducer.lists))
    let parentIndex = tempState.findIndex((item) => {
        return item.id == parentId
    })
    let itemIndex = tempState[parentIndex].sublist.findIndex((item) => {
        return item.id == id
    })
    return itemIndex
}

function getParentIndex(id) {
    const tempState = JSON.parse(JSON.stringify(store.getState().listReducer.lists))

    let parentIndex = tempState.findIndex((item, index) => {
        return item.id == id
    })
    return parentIndex
}