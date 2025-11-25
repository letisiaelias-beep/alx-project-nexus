import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PollDetail from "./pages/PollDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/polls/:id" element={<PollDetail />} />
    </Routes>
  );
}

export default App;
