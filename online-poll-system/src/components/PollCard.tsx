import React from "react";

export type PollProps = {
  poll: {
    id: string;
    title: string;
    image?: string;
    totalVotes: number;
    status?: "active" | "closed" | "draft";
  };
  onOpen: (id: string) => void;
};

const PollCard: React.FC<PollProps> = ({ poll, onOpen }) => {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="h-40 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* Use actual image URL or fallback */}
        <img
          src={poll.image ?? "/assets/screens.png"}
          alt={poll.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{poll.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {poll.totalVotes} votes • <span className="capitalize">{poll.status ?? "active"}</span>
        </p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onOpen(poll.id)}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition"
          >
            View Poll
          </button>

          <div className="text-xs text-gray-400">ID: {poll.id}</div>
        </div>
      </div>
    </article>
  );
};

export default PollCard;
