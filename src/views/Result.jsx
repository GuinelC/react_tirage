import React from "react";
import Results from "../components/Results";
import "../styles/Result.css";

const ResultsView = ({ players }) => {
  return (
    <div className="results-view">
      <h1>Résultats du tirage</h1>
      <Results players={players} />
    </div>
  );
};

export default ResultsView;
