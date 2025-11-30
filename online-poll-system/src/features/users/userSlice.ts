import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error?: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

// Replace with your backend API URL
const API_URL = process.env.REACT_APP_USERS_API || "http://localhost:4000/api/users";

// Async thunk to register a user
export const registerUser = createAsyncThunk(
  "users/register",
  async (payload: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register`, payload);
      return res.data as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to login a user
export const loginUser = createAsyncThunk(
  "users/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, payload);
      return res.data as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;


