// src/features/polls/pollsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchPolls } from "./pollsThunks";

type Poll = {
  id: string;
  title: string;
  image?: string;
  totalVotes?: number;
  status?: string;
};

interface PollState {
  polls: Poll[];
  loading: boolean;
  error?: string;
}

const initialState: PollState = { polls: [], loading: false };

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPolls.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPolls.fulfilled, (state, action) => {
      state.loading = false;
      state.polls = action.payload;
    });
    builder.addCase(fetchPolls.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to load polls";
    });
  },
});

export default pollsSlice.reducer;
