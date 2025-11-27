// src/features/polls/pollsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Poll {
  id: string;
  title: string;
  image?: string;
  totalVotes?: number;
  status?: "active" | "closed" | "draft";
}

type PollsState = {
  polls: Poll[];
  loading: boolean;
  error?: string | null;
};

const initialState: PollsState = {
  polls: [],
  loading: false,
  error: null,
};

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    setPolls(state, action: PayloadAction<Poll[]>) {
      state.polls = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPoll(state, action: PayloadAction<Poll>) {
      state.polls.unshift(action.payload); // add to front
    },
    updatePoll(state, action: PayloadAction<Poll>) {
      const idx = state.polls.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) state.polls[idx] = action.payload;
    },
    removePoll(state, action: PayloadAction<string>) {
      state.polls = state.polls.filter((p) => p.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPolls, addPoll, updatePoll, removePoll, setLoading, setError } =
  pollsSlice.actions;

export default pollsSlice.reducer;
