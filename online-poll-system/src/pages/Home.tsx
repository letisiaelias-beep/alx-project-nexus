import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPolls } from "../features/polls/pollsThunks";
import PollCard from "../components/PollCard";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import type { Poll } from "../features/polls/pollsSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { polls, loading, error } = useAppSelector((state: RootState) => state.polls);

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  const handleOpen = (id: string) => {
    navigate(`/polls/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* ⭐ Modern Clean Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Instant Polls, Real-time Results
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Create polls, vote, and view live results.
          </p>
        </div>

        <button className="mt-4 md:mt-0 bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition shadow-sm">
          Start Your Poll Now
        </button>
      </header>
<div className="max-w-6xl mx-auto px-6 py-10">
  <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
    <div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Instant Polls, Real-time Results
      </h1>
      <p className="text-gray-600 mt-3 text-lg">Create polls, vote, and view live results.</p>
    </div>

    <button className="mt-4 md:mt-0 bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition shadow-sm">
      Start Your Poll Now
    </button>
  </header>

  <div className="bg-white rounded-2xl shadow-sm p-4">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  className="w-full h-12 rounded-xl font-medium"
    {Array.isArray(polls) && polls.length ? (
      polls.map((poll: Poll) => (
        <PollCard key={poll.id} poll={poll} onOpen={handleOpen} />
      ))
    ) : (
      <p className="text-gray-600">No polls yet</p>
    )}
  </div>
</div>
<div className="p-6">
  <div className="bg-red-500 text-white p-4 rounded">
  </div>
</div>

      {/* Loading/Error */}
      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading polls...</p>
      )}
      {error && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {/* ⭐ Polls Grid - modern and clean */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll: Poll) => (
          <PollCard
            key={poll.id}
            poll={{
              ...poll,
              title: poll.title ?? "Untitled Poll",
              totalVotes: poll.totalVotes ?? 0,
              image: poll.image || "/assets/screens.png",
            }}
            onOpen={handleOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
