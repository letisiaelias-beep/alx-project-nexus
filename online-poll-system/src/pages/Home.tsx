import React, { useEffect } from "react";
// Update the import path if hooks are located elsewhere, e.g. "../app/hooks"
// Update the path below to the actual location of your hooks file
// Update the path below to the actual location of your hooks file
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPolls } from "../features/polls/pollsThunks";
import PollCard from "../components/PollCard";
import { useNavigate } from "react-router-dom";

type Poll = {
  id: string;
  title: string;
  image?: string;
  totalVotes: number;
  status: "active" | "closed" | "draft";
};

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {polls.map((p: Poll) => (
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
    </div>
  );
};

export default Home;
