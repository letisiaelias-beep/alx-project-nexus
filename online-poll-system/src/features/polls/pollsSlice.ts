// src/features/polls/pollsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPolls, createPoll } from "./pollsThunks"; // ensure these thunks exist

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  image?: string;
  totalVotes?: number;
  status?: "active" | "closed" | "draft";
  options?: PollOption[];
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
      state.polls.unshift(action.payload);
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
  extraReducers: (builder) => {
    builder
      // fetchPolls lifecycle
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolls.fulfilled, (state, action: PayloadAction<Poll[]>) => {
        state.polls = action.payload;
        state.loading = false;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // createPoll lifecycle
      .addCase(createPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoll.fulfilled, (state, action: PayloadAction<Poll>) => {
        state.polls.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setPolls, addPoll, updatePoll, removePoll, setLoading, setError } =
  pollsSlice.actions;

export default pollsSlice.reducer;

/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPolls, createPoll } from "./pollsThunks";

export interface Poll {
  id: string;
  title: string;
  image?: string;
  totalVotes?: number;
  status?: "active" | "closed" | "draft";
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  image?: string;
  totalVotes?: number;
  status?: "active" | "closed" | "draft";
  options?: PollOption[];    
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
      state.polls.unshift(action.payload);
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
  extraReducers: (builder) => {
    builder

      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolls.fulfilled, (state, action: PayloadAction<Poll[]>) => {
        state.polls = action.payload;
        state.loading = false;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // createPoll lifecycle
      .addCase(createPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoll.fulfilled, (state, action: PayloadAction<Poll>) => {
        state.polls.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setPolls, addPoll, updatePoll, removePoll, setLoading, setError } =
  pollsSlice.actions;

export default pollsSlice.reducer;*/


