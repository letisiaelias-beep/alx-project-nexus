// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./app/(home)/home";
import CreatePoll from "./app/createpoll";
import PollDetail from "./app/(home)/polldetail";
import Dashboard from "./app/(home)/dashboard";

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


