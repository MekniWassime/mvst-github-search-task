import { createSlice } from '@reduxjs/toolkit';

//For now this contains only the dark mode theme information
//but it is intened to hold and settings like language etc

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