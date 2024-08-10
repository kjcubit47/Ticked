import { combineReducers } from "@reduxjs/toolkit";
import * as Notifications from "expo-notifications"
import { scheduleDateAlert } from "Notifications";
import types from "Redux/Actions/ActionTypes"

// async function d() {
//     await Notifications.cancelAllScheduledNotificationsAsync()


// }
// d()

const initialListState = {
    lists: [],
    idCount: 0,
}

function listStateReducer(state = initialListState, action) {
    switch (action.type) {
        case types.RESET_STATE:
            return initialListState;
        case types.SET_LIST_COUNT:
            return {
                ...state,
                listCount: action.payload
            }
        case types.ADD_LIST:
            return {
                ...state,
                lists: state.lists.concat(action.payload),
                idCount: state.idCount + 1
            }
        case types.DELETE_LIST:
            let deleteListState = JSON.parse(JSON.stringify(state.lists))
            const dlIndex = deleteListState.findIndex((item) => {
                item.id === action.payload
            })
            async function deleteNotifications() {

                for (const sublist in deleteListState[dlIndex]) {
                    if (sublist.dueDate != null) {
                        await Notifications.cancelScheduledNotificationAsync(sublist.dueDate)
                    }
                    if (sublist.dueTime != null) {
                        await Notifications.cancelScheduledNotificationAsync(sublist.dueTime)
                    }
                }
            }
            deleteNotifications()
            deleteListState = deleteListState.filter((object) => {

                return object.id != action.payload
            })
            return {
                ...state,
                lists: deleteListState,

            }
        case types.UPDATE_LIST_NAME:
            let updateIndex = -1;
            state.lists.filter((object, index) => {
                if (object.id == action.payload.id) {
                    updateIndex = index
                }
                return true
            })

            if (updateIndex != -1) {
                const updatedState = JSON.parse(JSON.stringify(state.lists))
                updatedState[updateIndex].title = action.payload.title

                return {
                    ...state,
                    lists: updatedState,
                }
            } else {
                return state
            }
        case types.ADD_SUBLIST_ITEM:
            const newSublistState = JSON.parse(JSON.stringify(state.lists))
            let nssIndex = newSublistState.findIndex((item) => {
                return item.id == action.payload.parentId
            })
            newSublistState[nssIndex].sublist.push(action.payload)

            return {
                ...state,
                lists: newSublistState,
                idCount: state.idCount + 1


            }

        case types.SET_SUBLIST_TITLE:
            const newSublistTitleState = JSON.parse(JSON.stringify(state.lists))
            let sstIndex = newSublistTitleState.findIndex((item) => {
                return item.id == action.payload.parentId
            })
            let sstIndex2 = newSublistTitleState[sstIndex].sublist.findIndex((item) => {
                return item.id == action.payload.id
            })
            newSublistTitleState[sstIndex].sublist[sstIndex2].title = action.payload.title

            return {
                ...state,
                lists: newSublistTitleState,
            }

        case types.SET_ITEM_COMPLETE:
            const SetItemCompleteState = JSON.parse(JSON.stringify(state.lists))
            let sicIndex = SetItemCompleteState.findIndex((item) => {
                return item.id == action.payload.parentId
            })

            let sicIndex2 = SetItemCompleteState[sicIndex].sublist.findIndex((item) => {
                return item.id == action.payload.itemId
            })
            SetItemCompleteState[sicIndex].sublist[sicIndex2].complete = action.payload.complete
            return {
                ...state,
                lists: SetItemCompleteState
            }
        case types.DELETE_SUBLIST_ITEM:

            const deleteSublistState = JSON.parse(JSON.stringify(state.lists))
            let dssIndex = deleteSublistState.findIndex((item) => {
                return item.id == action.payload.parentId
            })
            deleteSublistState[dssIndex].sublist = deleteSublistState[dssIndex].sublist.filter(item => { return item.id !== action.payload.itemId })
            return {
                ...state,
                lists: deleteSublistState
            }
        case types.SET_SUBLIST_IMPORTANT:
            const setSublistImportantState = JSON.parse(JSON.stringify(state.lists))
            let ssiIndex = setSublistImportantState.findIndex((item) => {
                return item.id == action.payload.parentId
            })
            let ssiIndex2 = setSublistImportantState[ssiIndex].sublist.findIndex((item) => {
                return item.id == action.payload.itemId
            })
            if (ssiIndex >= 0 && ssiIndex2 >= 0) {

                setSublistImportantState[ssiIndex].sublist[ssiIndex2].important = action.payload.important
            }
            return {
                ...state,
                lists: setSublistImportantState
            }
        case types.SET_SUBLIST_NOTE:
            const setSublistNoteState = JSON.parse(JSON.stringify(state.lists))

            let ssnIndex = setSublistNoteState.findIndex((item) => {
                return item.id == action.payload.parentId
            })

            let ssnIndex2 = setSublistNoteState[ssnIndex].sublist.findIndex((item) => {
                return item.id == action.payload.itemId
            })

            setSublistNoteState[ssnIndex].sublist[ssnIndex2].note = action.payload.note
            return {
                ...state,
                lists: setSublistNoteState
            }
        case types.SET_SUBLIST_DUE_DATE:
            const setSublistDueDateState = JSON.parse(JSON.stringify(state.lists))
            let ssddIndex = setSublistDueDateState.findIndex((item) => {
                return item.id == action.payload.parentId
            })

            let ssddIndex2 = setSublistNoteState[ssddIndex].sublist.findIndex((item) => {
                return item.id == action.payload.itemId
            })

            setSublistDueDateState[ssddIndex].sublist[ssddIndex2].dueDate = action.payload.dueDate
            return {
                ...state,
                lists: setSublistDueDateState
            }
        case types.SET_SUBLIST_DUE_TIME:
            const setSublistDueTimeState = JSON.parse(JSON.stringify(state.lists))
            let ssdtIndex = setSublistDueTimeState.findIndex((item) => {
                return item.id == action.payload.parentId
            })

            let ssdtIndex2 = setSublistDueTimeState[ssdtIndex].sublist.findIndex((item) => {
                return item.id == action.payload.itemId
            })

            setSublistDueDateState[ssdtIndex].sublist[ssdtIndex2].dueTime = action.payload.dueTime
            return {
                ...state,
                lists: setSublistDueTimeState
            }
        default: return state

    }
}

const initialFlatListRefreshState = {

}

function flatListRefreshStateReducer(state = initialFlatListRefreshState, action) {
    switch (action.type) {
        case types.REFRESH_LISTS:
            return {
                refresh: action.payload
            }
        default: return state
    }
}

export const rootReducer = combineReducers({ listReducer: listStateReducer, refreshReducer: flatListRefreshStateReducer })
