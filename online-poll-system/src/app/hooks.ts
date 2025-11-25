import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers"; // Removed: not needed
import { combineReducers } from "@reduxjs/toolkit";
// Import your individual reducers here
// import userReducer from "./userReducer";
// import pollReducer from "./pollReducer";

const rootReducer = combineReducers({
  // user: userReducer,
  // poll: pollReducer,
  // Add your reducers here
});

export default rootReducer;
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Correct dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Correct selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
