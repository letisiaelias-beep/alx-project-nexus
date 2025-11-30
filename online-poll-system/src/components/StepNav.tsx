import React from "react";

const StepNav: React.FC<{ step: number; steps: string[] }> = ({ step, steps }) => (
  <div className="flex items-center space-x-4 mb-6">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= step ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-500"}`}>
          {i + 1}
        </div>
        <div className="ml-2 text-sm text-gray-600 hidden sm:block">{s}</div>
      </div>
    ))}
  </div>
);

export default StepNav;


