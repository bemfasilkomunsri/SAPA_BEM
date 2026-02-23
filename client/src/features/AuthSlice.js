import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};



// =====================
// LOGIN USER
// =====================
export const LoginUser = createAsyncThunk(
    "user/LoginUser",
    async (user, thunkAPI) => {
        try {

            console.log("LOGIN REQUEST:", user);

            const response = await axios.post(
                `${API}/api/login`,
                user,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            return response.data;

        } catch (error) {

            console.log("LOGIN ERROR FULL:", error);

            if (error.response) {

                console.log("LOGIN ERROR RESPONSE:", error.response.data);

                return thunkAPI.rejectWithValue(
                    error.response.data.msg || "Login gagal"
                );
            }

            return thunkAPI.rejectWithValue("Server error");
        }
    }
);



// =====================
// GET ME
// =====================
export const getMe = createAsyncThunk(
    "user/getMe",
    async (_, thunkAPI) => {

        try {

            const response = await axios.get(
                `${API}/api/me`,
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (error) {

            if (error.response) {

                return thunkAPI.rejectWithValue(
                    error.response.data.msg
                );
            }

            return thunkAPI.rejectWithValue("Server error");
        }
    }
);



// =====================
// LOGOUT
// =====================
export const LogOut = createAsyncThunk(
    "user/LogOut",
    async () => {

        await axios.delete(
            `${API}/api/logout`,
            {
                withCredentials: true
            }
        );

    }
);



// =====================
// SLICE
// =====================
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }

    },

    extraReducers: (builder) => {

        builder

        // LOGIN
        .addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(LoginUser.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;

            state.user = action.payload.user;
            state.message = action.payload.msg;

        })

        .addCase(LoginUser.rejected, (state, action) => {

            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

        })



        // GET ME
        .addCase(getMe.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(getMe.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;

        })

        .addCase(getMe.rejected, (state, action) => {

            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

        })



        // LOGOUT
        .addCase(LogOut.fulfilled, (state) => {

            state.user = null;
            state.isSuccess = false;

        });

    }
});



export const { reset } = authSlice.actions;
export default authSlice.reducer;
