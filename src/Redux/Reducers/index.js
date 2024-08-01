import { combineReducers } from "@reduxjs/toolkit";
import types from "Redux/Actions/ActionTypes"

const initialListState = {
    lists: [],
    listCount: 0,
}

function listStateReducer(state = initialListState, action) {
    switch (action.type) {

        case types.SET_LIST_COUNT:
            return {
                ...state,
                listCount: action.payload
            }
        case types.ADD_LIST:
            return {
                ...state,
                lists: state.lists.concat(action.payload),
                listCount: state.listCount + 1
            }
        case types.DELETE_LIST:
            let deleteListState = JSON.parse(JSON.stringify(state.lists))
            deleteListState = deleteListState.filter((object) => {

                return object.id != action.payload
            })
            return {
                ...state,
                lists: deleteListState,
                listCount: state.listCount - 1
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
            newSublistState[action.payload.parentId].sublist.push(action.payload)
            return {
                ...state,
                lists: newSublistState,

            }
        case types.SET_ITEM_COMPLETE:
            const SetItemCompleteState = JSON.parse(JSON.stringify(state.lists))
            SetItemCompleteState[action.payload.parentId].sublist[action.payload.itemId].complete = action.payload.complete
            return {
                ...state,
                lists: SetItemCompleteState
            }
        case types.DELETE_SUBLIST_ITEM:
            const deleteSublistState = JSON.parse(JSON.stringify(state.lists))
            deleteSublistState[action.payload.parentId].sublist = deleteSublistState[action.payload.parentId].sublist.filter(item => { return item.id !== action.payload.itemId })
            return {
                ...state,
                lists: deleteSublistState
            }
        case types.SET_SUBLIST_IMPORTANT:
            const setSublistImportantState = JSON.parse(JSON.stringify(state.lists))
            setSublistImportantState[action.payload.parentId].sublist[action.payload.itemId].important = action.payload.important

            // SORT BY IMPORTANT -- SHOULD BE FIRST

            // setSublistImportantState[action.payload.parentId].sublist.sort((x, y) => {
            //     return (x.important === y.important) ? 0 : x.important ? -1 : 1;

            // })
            return {
                ...state,
                lists: setSublistImportantState
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
