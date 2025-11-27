
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Poll } from "./pollsSlice";

const API_URL =
  process.env.REACT_APP_POLLS_API || "http://localhost:4000/api/polls";

export const createPoll = createAsyncThunk(
  "polls/createPoll",
  async (payload: Partial<Poll>, thunkAPI) => {
    try {
      const res = await axios.post(API_URL, payload);
      return res.data as Poll;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
