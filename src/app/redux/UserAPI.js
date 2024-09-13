import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helpers/AxiosInstance";

export const login = createAsyncThunk(
    "user/login",
    async (user, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance()
                .post("/users/login", user);
            console.log(response);
            if (response.status == true) {
                return response.user;
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);





