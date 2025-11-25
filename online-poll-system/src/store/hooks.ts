import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Correct dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Correct selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
