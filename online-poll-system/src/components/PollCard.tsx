import React from "react";

export type PollSummary = {
  id: string;
  title: string;
  image?: string;
  totalVotes?: number;
  status?: "active" | "closed" | "draft";
};

const statusColor = (s?: string) =>
  s === "active" ? "bg-green-100 text-green-800" : s === "closed" ? "bg-gray-100 text-gray-700" : "bg-yellow-100 text-yellow-800";

export const PollCard: React.FC<{ poll: PollSummary; onOpen?: (id: string) => void }> = ({ poll, onOpen }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      {poll.image ? (
        <img src={poll.image} alt={poll.title} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
      )}
      <div className="p-3">
        <h3 className="text-lg font-semibold mb-1">{poll.title}</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{poll.totalVotes ?? 0} votes</span>
          <span className={`px-2 py-1 rounded text-xs ${statusColor(poll.status)}`}>{poll.status ?? "draft"}</span>
        </div>
        <button
          onClick={() => onOpen?.(poll.id)}
          className="mt-3 w-full inline-block bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          View Poll
        </button>
      </div>
    </div>
  );
};

export default PollCard;
