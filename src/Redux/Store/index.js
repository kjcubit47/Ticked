import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "Redux/Reducers";

const store = configureStore({
    reducer: rootReducer,

});

export default store;