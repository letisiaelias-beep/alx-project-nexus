import React from "react";
import Toggle from "../../components/toggle";

type Props = {
  allowMultiple: boolean;
  setAllowMultiple: (v: boolean) => void;
  allowAnon: boolean;
  setAllowAnon: (v: boolean) => void;
  expiration: string;
  setExpiration: (s: string) => void;
};

const PollSettings: React.FC<Props> = ({ allowMultiple, setAllowMultiple, allowAnon, setAllowAnon, expiration, setExpiration }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="font-medium mb-3">Poll Settings</h3>
    <div className="space-y-4">
      <Toggle checked={allowMultiple} onChange={setAllowMultiple} label="Allow multiple selections" />
      <Toggle checked={allowAnon} onChange={setAllowAnon} label="Allow anonymous voting" />
      <label>
        <div className="text-sm text-gray-700 mb-1">Expiration</div>
        <input type="date" value={expiration} onChange={(e) => setExpiration(e.target.value)} className="border rounded p-2" />
      </label>
    </div>
  </div>
);

export default PollSettings;
