import * as Notifications from 'expo-notifications'
import { schedulePushNotification } from 'Notifications'
import store from 'Redux/Store'

describe("Notifications", () => {
    test("Initial notification count should be 0", async () => {
        let count = await Notifications.getAllScheduledNotificationsAsync()
        expect(count == 0)
    })

    test("Schedule notification", async () => {
        await schedulePushNotification("Test", "From the test suite", {}, null)
        let count = await Notifications.getAllScheduledNotificationsAsync()
        expect(count == 1)
    })

    test("Delete notification", async () => {
        let id = await schedulePushNotification("Test", "From the test suite", {}, null)
        await Notifications.cancelScheduledNotificationAsync(id)
        let count = await Notifications.getAllScheduledNotificationsAsync()
        expect(count == 0)
    })

    test("Sublist item dueDate dispatch", async () => {
        let state = store
        let testDate = new Date()
        const notificationId = await schedulePushNotification("TEST-NOTIFICATION", "TEST-BODY", {}, { date: testDate.getDate() })
        state.dispatch({ type: "ADD_LIST", payload: { title: "TEST-LIST", id: 0, sublist: [] } })
        state.dispatch({
            type: "ADD_SUBLIST_ITEM", payload: {
                title: "TEST-SUBLIST",
                id: 1,
                parentId: 0,
                note: '',
                complete: false,
                important: false,
                dueDate: JSON.parse(JSON.stringify(testDate)),
                dueTime: null,
                notificationDateId: notificationId,
                notificationTimeId: null,
                createdAt: new Date().getTime()
            }
        })
        let sublistItem = state.getState().listReducer.lists[0].sublist[0]
        let count = await Notifications.getAllScheduledNotificationsAsync()
        expect(count).toBe(1)
        expect(sublistItem.notificationDateId).not.toBeNull
        expect(sublistItem.dueDate != null)
        state.dispatch({ type: "RESET_STATE" })
    })
    test("Sublist item dueTime dispatch", async () => {
        let state = store
        let testTime = new Date()
        const notificationId = await schedulePushNotification("TEST-NOTIFICATION", "TEST-BODY", {}, { minute: testTime.getMinutes(), hour: testTime.getHours() })
        state.dispatch({ type: "ADD_LIST", payload: { title: "TEST-LIST", id: 0, sublist: [] } })
        state.dispatch({
            type: "ADD_SUBLIST_ITEM", payload: {
                title: "TEST-SUBLIST",
                id: 1,
                parentId: 0,
                note: '',
                complete: false,
                important: false,
                dueDate: null,
                dueTime: JSON.parse(JSON.stringify(testTime)),
                notificationDateId: null,
                notificationTimeId: notificationId,
                createdAt: new Date().getTime()
            }
        })
        let sublistItem = state.getState().listReducer.lists[0].sublist[0]
        let count = await Notifications.getAllScheduledNotificationsAsync()
        expect(count == 1)
        expect(sublistItem.notificationTimeId != null)
        expect(sublistItem.dueTime != null)
        state.dispatch({ type: "RESET_STATE" })

    })
})