import React, { useState } from "react";
import StepNav from "../components/StepNav";
import Toggle from "../components/Toggle";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { createPollThunk } from "../features/polls/pollsThunks"; // adapt if you have create thunk

type Option = { id: string; text: string };

const defaultOptions = [
  { id: "o1", text: "" },
  { id: "o2", text: "" },
];

const CreatePoll: React.FC = () => {
  const steps = ["Question & Options", "Settings", "Preview"];
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>(defaultOptions);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [allowAnon, setAllowAnon] = useState(false);
  const [expiration, setExpiration] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function addOption() {
    setOptions((s) => [...s, { id: `o${Date.now()}`, text: "" }]);
  }
  function removeOption(id: string) {
    setOptions((s) => s.filter((o) => o.id !== id));
  }
  function updateOption(id: string, value: string) {
    setOptions((s) => s.map((o) => (o.id === id ? { ...o, text: value } : o)));
  }

  function handleSubmit() {
    const payload = {
      title: question,
      options: options.map((o) => o.text).filter(Boolean),
      settings: {
        allowMultiple,
        allowAnon,
        expiration,
      },
    };
    // dispatch an action; adapt this to your slice
    // dispatch(createPollThunk(payload));
    console.log("submit payload", payload);
    navigate("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <StepNav step={step} steps={steps} />

      {step === 0 && (
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-gray-700">Poll Question</label>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-2 block w-full border rounded p-2" placeholder="e.g. What's your favourite color?" />

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Options</h3>
              <button onClick={addOption} className="text-sm text-teal-600">+ Add option</button>
            </div>

            {options.map((opt, idx) => (
              <div key={opt.id} className="flex gap-2 mt-2">
                <input className="flex-1 border rounded p-2" value={opt.text} onChange={(e) => updateOption(opt.id, e.target.value)} placeholder={`Option ${idx + 1}`} />
                <button onClick={() => removeOption(opt.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded">Remove</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3">Poll Settings</h3>
          <div className="grid gap-4">
            <Toggle checked={allowMultiple} onChange={setAllowMultiple} label="Allow multiple selections" />
            <Toggle checked={allowAnon} onChange={setAllowAnon} label="Allow anonymous voting" />
            <label className="block">
              <div className="text-sm text-gray-700 mb-1">Expiration date</div>
              <input type="date" value={expiration} onChange={(e) => setExpiration(e.target.value)} className="border rounded p-2" />
            </label>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">{question || "Untitled Poll"}</h4>
            <div className="mt-2 space-y-2">
              {options.map((o, idx) => (
                <div key={o.id} className="p-2 bg-gray-50 rounded">{o.text || `Option ${idx + 1}`}</div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Settings: {allowMultiple ? "Multiple selection" : "Single choice"} • {allowAnon ? "Anonymous" : "Named"} • Expiration: {expiration || "None"}
          </div>
        </section>
      )}

      {/* navigation */}
      <div className="flex items-center justify-between mt-6">
        <div>
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="mr-3 px-4 py-2 rounded bg-slate-100">Back</button>}
          {step < steps.length - 1 && <button onClick={() => setStep(s => s + 1)} className="px-4 py-2 rounded bg-teal-600 text-white">Next</button>}
        </div>

        {step === steps.length - 1 && (
          <div>
            <button onClick={() => handleSubmit()} className="px-4 py-2 rounded bg-green-600 text-white">Submit Poll</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePoll;
