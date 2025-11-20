import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_POLLS_API || "http://localhost:4000/api/polls";

export const fetchPolls = createAsyncThunk("polls/fetch", async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
   
    // fallback to mock
    return [
      { id: "1", title: "What's your favourite color?", image: "/assets/screens.png", totalVotes: 154, status: "active" },
      { id: "2", title: "Lunch today?", image: "/assets/screens.png", totalVotes: 99, status: "closed" },
    ];
  }
});
