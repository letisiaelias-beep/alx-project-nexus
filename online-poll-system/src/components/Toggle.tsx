import React from "react";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
};

const Toggle: React.FC<Props> = ({ checked, onChange, label }) => (
  <label className="flex items-center space-x-3">
    <span className="text-sm text-gray-600">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full p-1 transition ${checked ? "bg-teal-600" : "bg-gray-300"}`}
      aria-pressed={checked}
    >
      <span className={`block bg-white w-4 h-4 rounded-full transform transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  </label>
);

export default Toggle;
