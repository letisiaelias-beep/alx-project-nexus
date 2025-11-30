// src/pages/PollResults.tsx
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";
import type { Poll } from "../../features/polls/pollsSlice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Shape of poll option
type PollOption = {
  id: string;
  text: string;
  votes: number;
};

const PollResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const poll = useAppSelector((state: RootState) =>
    state.polls.polls.find((p: Poll) => String(p.id) === String(id))
  );

  if (!poll) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p className="text-gray-600">Poll not found.</p>
        <button
          className="mt-4 px-4 py-2 rounded border"
          onClick={() => navigate("/")}
        >
          Back home
        </button>
      </div>
    );
  }

  // Use poll.options from store; fallback to deterministic placeholders
  const results: PollOption[] =
    poll.options?.map((o) => ({
      id: o.id,
      text: o.text,
      votes: o.votes || 0,
    })) || [
      { id: "a", text: "Option A", votes: Math.floor(((poll.totalVotes ?? 0) * 0.5)) },
      { id: "b", text: "Option B", votes: Math.floor(((poll.totalVotes ?? 0) * 0.3)) },
      { id: "c", text: "Option C", votes: Math.floor(((poll.totalVotes ?? 0) * 0.2)) },
    ];

  const totalVotes = useMemo(
    () => results.reduce((sum, r) => sum + r.votes, 0) || 1,
    [results]
  );

  const chartData = results.map((r) => ({
    name: r.text.length > 20 ? r.text.slice(0, 20) + "â€¦" : r.text,
    votes: r.votes,
  }));

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{poll.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{totalVotes} total vote(s)</p>

      <div className="space-y-4">
        {results.map((r) => {
          const pct = Math.round((r.votes / totalVotes) * 100);
          return (
            <div key={r.id}>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">{r.text}</div>
                <div className="text-sm text-gray-500">
                  {r.votes} ({pct}%)
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  style={{ width: `${pct}%` }}
                  className="bg-teal-600 h-3 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-white p-3 rounded shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Visual breakdown</div>
        {chartData.length > 0 ? (
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="votes" fill="#0f766e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No results to chart</div>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 w-full h-10 rounded-md border border-gray-200"
      >
        Back
      </button>
    </div>
  );
};

export default PollResults;


  /* / src/pages/PollResults.tsx
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import type { Poll } from "../features/polls/pollsSlice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Define the shape of a poll option
type PollOption = {
  id: string;
  text: string;
  votes: number;
};

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
        <button
          className="mt-4 px-4 py-2 rounded border"
          onClick={() => navigate("/")}
        >
          Back home
        </button>
      </div>
    );
  }

  // Get poll options safely, fallback to dummy options if missing
  const results: PollOption[] =
    poll.options && Array.isArray(poll.options) && poll.options.length > 0
      ? poll.options.map((o) => ({
          id: o.id,
          text: o.text,
          votes: Number(o.votes || 0),
        }))
      : [
          { id: "a", text: "Option A", votes: Math.floor(((poll.totalVotes ?? 0) * 0.5)) },
          { id: "b", text: "Option B", votes: Math.floor(((poll.totalVotes ?? 0) * 0.3)) },
          { id: "c", text: "Option C", votes: Math.floor(((poll.totalVotes ?? 0) * 0.2)) },
        ];

  const totalVotes = useMemo(
    () => results.reduce((sum: number, r: PollOption) => sum + r.votes, 0) || 1,
    [results]
  );

  // Prepare data for recharts
  const chartData = results.map((r: PollOption) => ({
    name: r.text.length > 20 ? r.text.slice(0, 20) + "â€¦" : r.text,
    votes: r.votes,
  }));

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{poll.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{totalVotes} total vote(s)</p>

      <div className="space-y-4">
        {results.map((r: PollOption) => {
          const pct = Math.round((r.votes / totalVotes) * 100);
          return (
            <div key={r.id}>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">{r.text}</div>
                <div className="text-sm text-gray-500">
                  {r.votes} ({pct}%)
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  style={{ width: `${pct}%` }}
                  className="bg-teal-600 h-3 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-white p-3 rounded shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Visual breakdown</div>
        {chartData.length ? (
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="votes" fill="#0f766e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No results to chart</div>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 w-full h-10 rounded-md border border-gray-200"
      >
        Back
      </button>
    </div>
  );
};

export default PollResults;
*/

