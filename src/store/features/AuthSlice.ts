import { getCurrentLogin } from './../../querries/RepoQuerries';
import { apolloClient } from './../../services/Apollo/apolloClient';
import { redirect } from './../../../node_modules/@remix-run/router/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from "@reduxjs/toolkit";

const PROXY_SERVER_URI = process.env.REACT_APP_PROXY_SERVER_URI;

interface AuthState {
    login: string | null
    accessToken: string | null,
    state: "idle" | "pending" | "succeeded" | "failed",
}

const initialState: AuthState = {
    login: null,
    accessToken: null,
    state: "idle"
}
/**
 * this action uses 'code' to fetch an access token from github oauth through a proxy server
 * 
 * note that this action is an Async Thunk
 * @param code a query param fetched after the github oauth redirect
 */
export const getAccessToken = createAsyncThunk(
    'auth/getAccessToken',
    async (code: string) => {
        const response = await fetch(`${PROXY_SERVER_URI}/getAccessToken?code=${code}`)
        const data = await response.json()
        //github oauth error format, error key contains error message
        if ('error' in data) throw new Error(data.error);
        //if no error occured then we know that our data contains an access_token
        localStorage.setItem("accessToken", data.access_token)
        const login = await getCurrentLogin();
        return { accessToken: data.access_token, login }
    }
)

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.login = null;
            state.state = "idle";
            localStorage.removeItem("accessToken")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            console.log(action.payload)
            state.accessToken = action.payload.accessToken;
            state.login = action.payload.login
            state.state = "succeeded"
            localStorage.setItem("accessToken", action.payload.accessToken)
        })
        builder.addCase(getAccessToken.rejected, (state, action) => {
            state.accessToken = null;
            state.login = null;
            state.state = "failed"
            localStorage.removeItem("accessToken")
        })
        builder.addCase(getAccessToken.pending, (state, action) => {
            state.state = "pending"
        })
    }
})

export const { logout } = AuthSlice.actions;