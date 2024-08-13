import * as types from "../Redux/Actions/ActionTypes";
import * as Notifications from "expo-notifications"
import { schedulePushNotification } from "Notifications";
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

export async function rescheduleItemNotifications(id, parentId, complete) {
    if (complete) {
        return
    }
    const tempState = JSON.parse(JSON.stringify(store.getState().listReducer.lists))
    const [sublistIndex, parentIndex] = getSublistIndex(id, parentId)
    const item = tempState[parentIndex].sublist[sublistIndex]
    let newDateId = null
    let newTimeId = null

    if (item.dueDate != null) {
        newDateId = await schedulePushNotification(item.title, "A task is due!", {}, { date: new Date(item.dueDate) })
    }
    if (item.dueTime != null) {
        let tempTime = new Date(item.dueTime)
        newTimeId = await schedulePushNotification(item.title, "A task is due!", {}, { minute: tempTime.getMinutes(), hour: tempTime.getHours() })
    }


    return [newDateId, newTimeId]
}
export async function deleteSublistItemNotification(id, parentId) {
    const tempState = JSON.parse(JSON.stringify(store.getState().listReducer.lists))

    const [sublistIndex, parentIndex] = getSublistIndex(id, parentId)
    const item = tempState[parentIndex].sublist[sublistIndex]
    if (item.notificationDateId != null) {
        Notifications.cancelScheduledNotificationAsync(item.notificationDateId)
    }
    if (item.notificationTimeId != null) {
        Notifications.cancelScheduledNotificationAsync(item.notificationTimeId)
    }

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
    return [itemIndex, parentIndex]
}

function getParentIndex(id) {
    const tempState = JSON.parse(JSON.stringify(store.getState().listReducer.lists))

    let parentIndex = tempState.findIndex((item, index) => {
        return item.id == id
    })
    return parentIndex
}