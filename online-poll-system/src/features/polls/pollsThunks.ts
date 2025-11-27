import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addPoll } from "./pollsSlice";

const API_URL = process.env.REACT_APP_POLLS_API || "http://localhost:4000/api/polls";
export const createPollThunk = (payload: any) => async (dispatch: any) => {
  const res = await axios.post(API_URL, payload);
  dispatch(addPoll(res.data));
}

export const fetchPolls = createAsyncThunk("polls/fetch", async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
   
    return [
      { id: "1", title: "What's your favourite color?", image: "/assets/screens.png", totalVotes: 154, status: "active" },
      { id: "2", title: "Lunch today?", image: "/assets/screens.png", totalVotes: 99, status: "closed" },
    ];
  }
});
