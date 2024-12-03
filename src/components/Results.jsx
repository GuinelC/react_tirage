import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Results = ({ players }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duos, setDuos] = useState([]);
  const navigate = useNavigate();

  // Mélanger les joueurs une seule fois au chargement du composant
  useEffect(() => {
    const shuffledPlayers = [...players];

    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Création des duos
    const newDuos = [];
    while (shuffledPlayers.length > 1) {
      const player1 = shuffledPlayers.pop(); 
      const player2 = shuffledPlayers.pop();
      newDuos.push([player1, player2]);
    }

    setDuos(newDuos);
  }, [players]); // L'effet se déclenche uniquement lors du changement de players

  // Fonction pour naviguer entre les duos
  const next = () => {
    if (currentIndex < duos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentDuo = duos[currentIndex];
  
  // BACK HOME
  const handleBackToHome = () => {
    localStorage.removeItem("players");
    navigate("/"); 
  };
  
  return (
    <div className="results-carousel">
      {duos.length > 0 && (
        <div className="carousel-item">
          {currentDuo[0]}{" "}
          {currentDuo[1] ? `et ${currentDuo[1]}` : "n'a pas de partenaire. Il peut faire un cadeau à quelqu'un d'autre."}
        </div>
      )}
      <div className="controls">
        <button onClick={prev} disabled={currentIndex === 0}>
          Précédent
        </button>
        <button onClick={next} disabled={currentIndex === duos.length - 1}>
          Suivant
        </button>
      </div>
      <button onClick={handleBackToHome}>Retour à l'accueil</button>
    </div>
  );
};

export default Results;
