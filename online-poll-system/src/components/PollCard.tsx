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
    <article className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="h-40 w-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
        {/* image should exist in public/assets/screens.png or be a full URL */}
        <img
          src={poll.image ?? "/assets/screens.png"}
          alt={poll.title}
          className="object-cover w-full h-full"
        />

        {/* status badge */}
        <div className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-800 shadow-sm">
          <span className="capitalize">{poll.status ?? "active"}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{poll.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {poll.totalVotes} votes •{" "}
          <span className="capitalize">{poll.status ?? "active"}</span>
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          {/* On small screens make the button full width; on larger screens keep it inline */}
          <button
            onClick={() => onOpen(poll.id)}
            className="flex-1 h-11 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-shadow shadow-sm"
            aria-label={`Open poll ${poll.title}`}
          >
            View Poll
          </button>

          <div className="text-xs text-gray-400 min-w-[4.5rem] text-right">ID: {poll.id}</div>
        </div>
      </div>
    </article>
  );
};

export default PollCard;
