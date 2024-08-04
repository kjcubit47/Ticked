import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "Redux/Reducers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export const persistor = persistStore(store)

export default store;


