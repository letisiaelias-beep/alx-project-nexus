import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPolls } from "../features/polls/pollsThunks";
import PollCard from "../components/PollCard";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
// Update the import path based on where Poll type is actually exported
import type { Poll } from "../types/poll";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Select polls state from Redux store
  const { polls, loading, error } = useAppSelector((state: RootState) => state.polls);

  // Fetch polls on component mount
  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  // Navigate to poll detail page
  const handleOpen = (id: string) => {
    navigate(`/polls/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Instant Polls, Real-time Results</h1>
          <p className="text-gray-600">Create polls, vote, and view live results.</p>
        </div>
        <div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Start Your Poll Now
          </button>
        </div>
      </header>

      {/* Loading/Error display */}
      {loading && <p>Loading polls...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {polls.map((poll: Poll) => (
          <PollCard
            key={poll.id}
            poll={{
              ...poll, // spread all properties
              title: poll.title ?? "Untitled Poll",
              totalVotes: poll.totalVotes ?? 0, // ensure totalVotes is always a number
              image: poll.image || "/assets/screens.png", // fallback image
            }}
            onOpen={handleOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
