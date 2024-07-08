import { combineReducers } from "@reduxjs/toolkit";
import types from "Redux/Actions/ActionTypes"

const initialListState = {
    lists: [],
    listCount: 0
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
                // lists: state.lists.push(action.payload),
                lists: state.lists.concat(action.payload),
                // lists: [state.lists, action.payload],
                listCount: state.listCount + 1
            }
        case types.REMOVE_LIST:
            return {
                ...state,
                lists: state.lists.filter((object) => {
                    return object.id != action.payload
                }),
                listCount: state.listCount - 1
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
