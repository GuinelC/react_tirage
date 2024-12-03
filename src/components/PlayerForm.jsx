import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const PlayerForm = ({ players, setPlayers }) => {
  const [playerName, setPlayerName] = useState("");
  const [localPlayers, setLocalPlayers] = useState([]);
  const navigate = useNavigate();

    // Charger les joueurs depuis le localStorage
    useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players"));
    if (storedPlayers) {
        setLocalPlayers(storedPlayers);
    }
    }, []);

    // Sauvegarder les joueurs dans le localStorage
    useEffect(() => {
        if (localPlayers.length > 0) {
            localStorage.setItem("players", JSON.stringify(localPlayers));
        }
    }, [localPlayers]);

    const handleAddPlayer = () => {
        if (playerName.trim()) {
            const newPlayers = [...localPlayers, playerName];
            setLocalPlayers(newPlayers); 
            setPlayers(newPlayers);
            setPlayerName("");
        }
    };

    const handleDeletePlayer = (name) => {
    const updatedPlayers = localPlayers.filter((player) => player !== name);
    setLocalPlayers(updatedPlayers); 
    setPlayers(updatedPlayers);
    };

    const handleRedirectToResults = () => {
        const shuffledPlayers = [...localPlayers].sort(() => Math.random() - 0.5);
        setPlayers(shuffledPlayers);
        navigate("/results");
    };

    const remainingPlayers = 4 - localPlayers.length;
    const isPlayersOdd = localPlayers.length % 2 !== 0;

    return (
    <div>
        <h2>Ajouter des Joueurs</h2>
        <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nom du joueur"
        />
        <button onClick={handleAddPlayer}>Ajouter</button>

        {localPlayers.length > 0 && (
            <div className="list">
                <h3>Liste des joueurs</h3>
                <ul>
                {localPlayers.map((player, index) => (
                    <li key={index}>
                    {player}
                    <button onClick={() => handleDeletePlayer(player)}>Supprimer</button>
                    </li>
                ))}
                </ul>
            </div>
        )}

        {/* Message affiché si moins de 4 joueurs */}
        {localPlayers.length < 4 && (
            <p>Il vous reste {remainingPlayers} joueur{remainingPlayers > 1 ? "s" : ""} à ajouter avant de commencer.</p>
        )}

        {/* Message affiché si le nombre de joueurs est impair */}
        {localPlayers.length >= 4 && isPlayersOdd && (
            <p>
                Le nombre de joueurs est impair. Veuillez ajouter un autre joueur !
            </p>
        )}

        {/* Afficher le bouton vers les résultats si au moins 4 joueurs sont ajoutés et que le nombre est pair */}
        {localPlayers.length >= 4 && !isPlayersOdd && (
            <button onClick={handleRedirectToResults}>Mélanger</button>
        )}
    </div>
    );
};

export default PlayerForm;
