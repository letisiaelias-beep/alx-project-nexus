import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import type { RootState } from "../../store/store";
import type { Poll, PollOption } from "../../features/polls/pollsSlice";
import { updatePoll } from "../../features/polls/pollsSlice";

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const poll = useAppSelector((state: RootState) =>
    state.polls.polls.find((p: Poll) => String(p.id) === String(id))
  );

  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const isActive = poll.status === "active";

  const handleSelect = (opt: string) =>
    setSelected(opt === selected ? null : opt);

  const handleSubmit = () => {
    if (!selected) {
      alert("Select an option before submitting.");
      return;
    }
    if (!isActive) {
      alert("This poll is closed.");
      return;
    }

    setSubmitting(true);

    try {
        
      const updatedOptions: PollOption[] = poll.options?.map((o) =>
        o.text === selected ? { ...o, votes: o.votes + 1 } : o
      ) || [];

      const updatedPoll: Poll = {
        ...poll,
        totalVotes: (poll.totalVotes || 0) + 1,
        options: updatedOptions,
      };

      dispatch(updatePoll(updatedPoll));

      navigate(`/polls/${poll.id}/results`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit vote");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {poll.image && (
          <img
            src={poll.image}
            alt={poll.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}

        <h2 className="text-xl font-semibold mb-4 text-center">{poll.title}</h2>

        <div className="space-y-3">
          {poll.options?.map((opt) => {
            const isSelected = selected === opt.text;
            const base =
              "w-full h-12 rounded-xl font-semibold text-white transition-shadow focus:outline-none";
            const colorClass =
              opt.text === "Blue"
                ? "bg-blue-600 hover:bg-blue-700"
                : opt.text === "Green"
                ? "bg-teal-600 hover:bg-teal-700"
                : opt.text === "Red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-400 hover:bg-yellow-500 text-black";
            const selectedClass = isSelected ? "ring-4 ring-black/10" : "";

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.text)}
                className={`${base} ${colorClass} ${selectedClass}`}
                aria-pressed={isSelected}
                aria-disabled={!isActive || submitting}
                disabled={!isActive || submitting}
                type="button"
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !isActive}
          className={`mt-5 w-full h-12 rounded-xl font-semibold ${
            isActive
              ? "bg-gray-900 hover:bg-gray-800 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          } disabled:opacity-60`}
        >
          {submitting ? "Submitting..." : isActive ? "Submit Vote" : "Poll Closed"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          {poll.totalVotes} votes • {isActive ? "Open" : "Closed"}
        </p>
      </div>
    </div>
  );
};

export default PollDetail;

/*/ src/pages/PollDetail.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Poll as PollType } from "../features/polls/pollsSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import type { RootState } from "../store/store";
// If you implement a vote thunk, import it here:
// import { voteOnPoll } from "../features/polls/pollsThunks";

const DemoPoll: PollType = {
  id: "demo",
  title: "What's your favorite color?",
  image: undefined,
  totalVotes: 154,
  status: "active",
};

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pollFromStore = useAppSelector((s: RootState) =>
    s.polls?.polls?.find((p: PollType) => String(p.id) === String(id))
  );
  const poll = pollFromStore ?? DemoPoll;

  const totalVotes = poll.totalVotes ?? 0;
  const isActive = poll.status === "active";

  const options = ["Blue", "Green", "Red", "Yellow"];

  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (opt: string) => setSelected(opt === selected ? null : opt);

  const handleSubmit = async () => {
    if (!selected) {
      alert("Select an option before submitting.");
      return;
    }
    if (!isActive) {
      alert("This poll is closed.");
      return;
    }

    setSubmitting(true);
    try {

      console.log("Submitting vote:", { pollId: poll.id, option: selected });

      // Navigate to results page (you must add PollResults route/page)
      navigate(`/polls/${poll.id}/results`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit vote");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {poll.image ? (
          <img
            src={poll.image}
            alt={poll.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        ) : null}

        <h2 className="text-xl font-semibold mb-4 text-center">{poll.title}</h2>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selected === opt;
            const base =
              "w-full h-12 rounded-xl font-semibold text-white transition-shadow focus:outline-none";
            const colorClass =
              opt === "Blue"
                ? "bg-blue-600 hover:bg-blue-700"
                : opt === "Green"
                ? "bg-teal-600 hover:bg-teal-700"
                : opt === "Red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-400 hover:bg-yellow-500 text-black";

            // show clear selected state even when disabled
            const selectedClass = isSelected ? "ring-4 ring-black/10" : "";

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`${base} ${colorClass} ${selectedClass}`}
                aria-pressed={isSelected}
                aria-disabled={!isActive || submitting}
                disabled={!isActive || submitting}
                type="button"
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !isActive}
          className={`mt-5 w-full h-12 rounded-xl font-semibold ${
            isActive ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          } disabled:opacity-60`}
        >
          {submitting ? "Submitting..." : isActive ? "Submit Vote" : "Poll Closed"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          {totalVotes} votes • {isActive ? "Open" : "Closed"}
        </p>
      </div>
    </div>
  );
};

export default PollDetail;*/