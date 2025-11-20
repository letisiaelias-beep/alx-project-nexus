import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.example.com/polls";

export const fetchPolls = createAsyncThunk("polls/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const voteOnPoll = createAsyncThunk(
  "polls/vote",
  async ({ pollId, optionId }: { pollId: string; optionId: string }) => {
    const res = await axios.post(`${API_URL}/${pollId}/vote`, { optionId });
    return res.data;
  }
);

export const createPoll = createAsyncThunk(
  "polls/create",
  async (pollData: PollCreateRequest) => {
    const res = await axios.post(API_URL, pollData);
    return res.data;
  }
);
