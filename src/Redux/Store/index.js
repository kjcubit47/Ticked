import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "Redux/Reducers";

import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';


const store = configureStore({
    reducer: rootReducer,
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export default store;


