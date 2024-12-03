import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Form from "./views/Form";
import Results from "./views/Result";
import "./App.css";

const App = () => {
  const [players, setPlayers] = useState([]); // Stockage des joueurs

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/form"
          element={<Form players={players} setPlayers={setPlayers} />}
        />
        <Route path="/results" element={<Results players={players} />} />
      </Routes>
    </div>
  );
};

export default App;
