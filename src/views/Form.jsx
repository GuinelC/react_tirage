import React from "react";
import PlayerForm from "../components/PlayerForm";
import "../styles/Form.css";

const Form = ({ players, setPlayers }) => {
  return (
    <div className="form-view">
      <PlayerForm players={players} setPlayers={setPlayers} />
    </div>
  );
};

export default Form;
