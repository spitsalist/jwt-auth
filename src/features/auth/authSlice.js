import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:5005/api/auth';

export const login = createAsyncThunk(
    'auth/login',
    async (
        userData,
        thunkApi
    ) => {
        try {
            const response = await axios.post(`${API_URL}/login`, userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            const message = error.response.data.message;
            return thunkApi.rejectWithValue({ message });
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (
        userData,
        thunkApi
    ) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            const message = error.response.data.message;
            return thunkApi.rejectWithValue({ message });
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
    },
    reducers: {
        resetState: (state) => {
            state.user = null;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = false;
                state.message= '';
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
           .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload.token;
                state.user = jwtDecode(action.payload.token);
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export const { resetState, logout } = authSlice.actions;

export default authSlice.reducer;