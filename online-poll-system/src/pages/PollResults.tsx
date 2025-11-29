// src/pages/PollResults.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import type { Poll } from "../features/polls/pollsSlice";

const PollResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const poll = useAppSelector((s: RootState) =>
    s.polls.polls.find((p: Poll) => String(p.id) === String(id))
  );

  if (!poll) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p className="text-gray-600">Poll not found.</p>
        <button className="mt-4" onClick={() => navigate("/")}>Back home</button>
      </div>
    );
  }

  const results = [
    { id: "a", text: "Option A", votes: Math.floor(Math.random() * 100) },
    { id: "b", text: "Option B", votes: Math.floor(Math.random() * 100) },
    { id: "c", text: "Option C", votes: Math.floor(Math.random() * 100) },
  ];

  const total = results.reduce((s, r) => s + r.votes, 0) || 1;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{poll.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{poll.totalVotes ?? 0} votes</p>

      <div className="space-y-3">
        {results.map((r) => {
          const pct = Math.round((r.votes / total) * 100);
          return (
            <div key={r.id}>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">{r.text}</div>
                <div className="text-sm text-gray-500">{r.votes} ({pct}%)</div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div style={{ width: `${pct}%` }} className="bg-teal-600 h-3 rounded-full" />
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate(-1)} className="mt-6 w-full h-10 rounded-md border border-gray-200">
        Back
      </button>
    </div>
  );
};

export default PollResults;
