import { createSlice } from '@reduxjs/toolkit';
interface AppSettingsState {
    darkMode: boolean;
}

const initialState: AppSettingsState = {
    darkMode: false
}

export const AppSettingsSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { toggleDarkMode } = AppSettingsSlice.actions