// src/features/polls/pollsThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Poll } from "./pollsSlice";

// FAKE SAMPLE POLLS (frontend-only) â€” updated question text
const SAMPLE_POLLS: Poll[] = [
  {
    id: "1",
    title: "What colour do you prefer?",
    totalVotes: 154,
    status: "active",
    options: [
      { id: "a", text: "Blue", votes: 60 },
      { id: "b", text: "Green", votes: 40 },
      { id: "c", text: "Red", votes: 30 },
      { id: "d", text: "Yellow", votes: 24 },
    ],
  },
];

export const fetchPolls = createAsyncThunk("polls/fetchPolls", async () => {
  return SAMPLE_POLLS;
});

export const createPoll = createAsyncThunk(
  "polls/createPoll",
  async (payload: Partial<Poll>) => {
    return {
      ...payload,
      id: String(Date.now()),
      totalVotes: 0,
      status: "active",
      options: [],
    } as Poll;
  }
);


/*src/features/polls/pollsThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Poll } from "./pollsSlice";

const API_URL = process.env.REACT_APP_POLLS_API || "http://localhost:4000/api/polls";

export const fetchPolls = createAsyncThunk("polls/fetchPolls", async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL);
    return res.data as Poll[];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

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
);*/


