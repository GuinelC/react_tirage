import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Bienvenue dans l'application de tirage au sort</h1>
      <button onClick={() => navigate("/form")} className="start-button">
        Commencer
      </button>
    </div>
  );
};

export default Home;
