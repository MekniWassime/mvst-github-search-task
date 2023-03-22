import { AuthSlice } from './features/AuthSlice';
import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { AppSettingsSlice } from './features/AppSettingsSlice';

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
}


const appSettingsPersistConfig = {
    key: 'appSettings',
    version: 1,
    storage,
}
//The auth and appsettings stores are persisted on the client's machine
const authPersistedReducer = persistReducer(authPersistConfig, AuthSlice.reducer);
const appSettingsPersistedReducer = persistReducer(appSettingsPersistConfig, AppSettingsSlice.reducer);

export const store = configureStore({
    reducer: {
        auth: authPersistedReducer,
        appSettings: appSettingsPersistedReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch