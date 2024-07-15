import { combineReducers } from "@reduxjs/toolkit";
import types from "Redux/Actions/ActionTypes"

const initialListState = {
    lists: [],
    listCount: 0,
    subListCount: 0,
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
        case types.REMOVE_LIST:
            let deleteListState = JSON.parse(JSON.stringify(state.lists))
            deleteListState.filter((object) => {
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
            // newSublistState[parentIndex].sublist = [newSublistState[parentIndex].sublist, action.payload]
            // newSublistState[parentIndex].sublist.push(action.payload)
            console.log(action)
            // newSublistState[action.payload.parentId].sublist.push(action.payload)

            return {
                ...state,
                lists: newSublistState,
                subListCount: state.subListCount + 1

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
