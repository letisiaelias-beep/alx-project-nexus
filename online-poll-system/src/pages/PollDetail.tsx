import React from "react";
import { useParams } from "react-router-dom";

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Poll detail</h2>
      <p>Poll id: <strong>{id}</strong></p>
      <p className="mt-4 text-gray-600">
        (Stub page — replace with actual poll detail UI and data fetching.)
      </p>
    </div>
  );
};

export default PollDetail;
