import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Poll as PollType } from "../features/polls/pollsSlice";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";

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

  const pollFromStore = useAppSelector((s: RootState) =>
    s.polls?.polls?.find((p: PollType) => String(p.id) === String(id))
  );
  const poll = pollFromStore ?? DemoPoll;

  const options = ["Blue", "Green", "Red", "Yellow"];

  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (opt: string) => setSelected(opt === selected ? null : opt);

  const handleSubmit = async () => {
    if (!selected) {
      alert("Select an option before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      console.log("Submitting vote:", { pollId: poll.id, option: selected });

      navigate(-1); 
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
        <h2 className="text-xl font-semibold mb-4 text-center">{poll.title}</h2>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selected === opt;
            const base = "w-full h-12 rounded-xl font-semibold text-white transition-shadow";
            // choose colors per option to match prototype
            const colorClass =
              opt === "Blue"
                ? "bg-blue-600 hover:bg-blue-700"
                : opt === "Green"
                ? "bg-teal-600 hover:bg-teal-700"
                : opt === "Red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-500 hover:bg-yellow-600 text-black";

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`${base} ${colorClass} ${isSelected ? "ring-4 ring-black/10" : ""}`}
                aria-pressed={isSelected}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-5 w-full h-12 rounded-xl font-semibold bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Vote"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          {poll.totalVotes} votes • Closes in 2 days
        </p>
      </div>
    </div>
  );
};

export default PollDetail;
