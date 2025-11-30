// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./app/(home)/Home";
import CreatePoll from "./app/CreatePoll";
import PollDetail from "./app/(home)/PollDetail";
import Dashboard from "./app/(home)/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePoll />} />
      <Route path="/polls/:id" element={<PollDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
