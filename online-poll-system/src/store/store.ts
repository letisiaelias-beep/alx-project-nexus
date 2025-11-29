import { configureStore } from "@reduxjs/toolkit";
import pollsReducer from "../features/polls/pollsSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    polls: pollsReducer,   // polls state
    users: userReducer,    // user state
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
