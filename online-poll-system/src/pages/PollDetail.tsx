import React from "react";

const PollDetail = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-6 text-center">
        What's your favorite color?
      </h2>

      {/* Voting Buttons */}
      <button className="w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 mb-3">
        Blue
      </button>

      <button className="w-full py-3 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 mb-3">
        Green
      </button>

      <button className="w-full py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 mb-3">
        Red
      </button>

      <button className="w-full py-3 rounded-lg font-medium text-white bg-yellow-500 hover:bg-yellow-600 mb-6">
        Yellow
      </button>

      <button className="w-full py-3 rounded-lg font-semibold bg-gray-900 text-white">
        Submit Vote
      </button>

      <p className="text-center text-gray-500 text-sm mt-3">
        154 votes • Closes in 2 days
      </p>
    </div>
  );
};

export default PollDetail;
