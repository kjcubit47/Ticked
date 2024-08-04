import { combineReducers } from "@reduxjs/toolkit";
import types from "Redux/Actions/ActionTypes"

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
