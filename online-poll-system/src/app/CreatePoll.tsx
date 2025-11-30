import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { createPoll } from "../features/polls/pollsThunks";

type Option = { id: string; text: string };

const CreatePoll: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<Option[]>([{ id: "1", text: "" }, { id: "2", text: "" }]);

  const handleOptionChange = (id: string, text: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)));
  };

  const handleSubmit = async () => {
    await dispatch(
      createPoll({
        title,
        totalVotes: 0,
        status: "active",
        image: "/assets/screens.png",
      })
    );
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Poll</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Poll title"
        className="w-full mb-4 p-2 border rounded"
      />

      {options.map((opt) => (
        <input
          key={opt.id}
          type="text"
          value={opt.text}
          onChange={(e) => handleOptionChange(opt.id, e.target.value)}
          placeholder={`Option ${opt.id}`}
          className="w-full mb-2 p-2 border rounded"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl font-semibold"
      >
        Create Poll
      </button>
    </div>
  );
};

export default CreatePoll;


