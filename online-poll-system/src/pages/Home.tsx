import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPolls } from "../features/polls/pollsThunks";
import PollCard from "../components/PollCard";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { polls, loading, error } = useAppSelector((s) => s.polls);

  useEffect(() => {
    // fetch polls on mount
    dispatch(fetchPolls());
  }, [dispatch]);

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
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Start Your Poll Now</button>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Recent Polls</h2>
        {loading && <div className="text-gray-600">Loading polls...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && polls.length === 0 && <div className="text-gray-500">No polls available yet.</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {polls.map((p) => (
            <PollCard
              key={p.id}
              poll={{
                id: p.id,
                title: p.title,
                image: p.image || "/assets/screens.png", // fallback to the screenshot composite if no image
                totalVotes: p.totalVotes,
                status: p.status,
              }}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
