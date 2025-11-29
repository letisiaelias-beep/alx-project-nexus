// src/features/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string; // if backend returns JWT
}

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk<
  User, // Return type
  { name: string; email: string; password: string }, // argument type
  { rejectValue: string }
>("users/registerUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.post("/api/register", payload); // your backend endpoint
    return res.data as User;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
