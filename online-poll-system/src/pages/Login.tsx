import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();
  const handle = () => nav("/dashboard");
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border rounded" />
      <input value={pw} onChange={(e)=>setPw(e.target.value)} placeholder="Password" type="password" className="w-full mb-4 p-2 border rounded" />
      <button onClick={handle} className="w-full bg-teal-600 h-11 rounded-xl text-white">Log in</button>
    </div>
  );
};
export default Login;
