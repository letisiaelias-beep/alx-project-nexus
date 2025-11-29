// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import PollDetail from "./pages/PollDetail";
import Dashboard from "./pages/Dashboard";

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
