import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Request API untuk login user
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        // Request POST ke API login dengan mengirimkan username dan password
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
            username: user.username,  // Ganti email dengan username
            password: user.password
        });
        console.log("Respons login:", response.data); // Debugging response
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        return thunkAPI.rejectWithValue("Server error, silahkan coba lagi");
    }
});

// Request API untuk ambil data user yang sedang login (user yang autentikasi)
export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Request API untuk logout user
export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/logout`);
});

// Slice untuk menangani autentikasi (login, logout, getMe)
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            state.message = "";
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;