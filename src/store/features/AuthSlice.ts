import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from "@reduxjs/toolkit";

const PROXY_SERVER_URI = process.env.REACT_APP_PROXY_SERVER_URI;

interface AuthState {
    accessToken: string | null,
    state: "idle" | "pending" | "succeeded" | "failed",
}

const initialState: AuthState = {
    accessToken: null,
    state: "idle"
}

export const getAccessToken = createAsyncThunk(
    'auth/getAccessToken',
    async (code: string) => {
        const response = await fetch(`${PROXY_SERVER_URI}/getAccessToken?code=${code}`)
        const data = await response.json()
        if ('error' in data) throw new Error(data.error);
        return data.access_token
    }
)

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.state = "idle";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            console.log(action.payload)
            state.accessToken = action.payload;
            state.state = "succeeded"
        })
        builder.addCase(getAccessToken.rejected, (state, action) => {
            state.accessToken = null;
            state.state = "failed"
        })
        builder.addCase(getAccessToken.pending, (state, action) => {
            state.state = "pending"
        })
    }
})

export const { logout } = AuthSlice.actions;