import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPolls, voteOnPoll, createPoll } from "./pollsThunks";

interface PollState {
  polls: Poll[];
  currentPoll?: Poll;
  loading: boolean;
  error?: string;
}

const initialState: PollState = {
  polls: [],
  loading: false,
};

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = action.payload;
      })
      .addCase(fetchPolls.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load polls";
      })
      .addCase(voteOnPoll.fulfilled, (state, action) => {
        state.currentPoll = action.payload;
      });
  },
});

export default pollsSlice.reducer;
