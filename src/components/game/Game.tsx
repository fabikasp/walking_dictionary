import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameProps } from "./types";
import "./Game.css";

export const Game = ({letter, participants, timer}: GameProps) => {
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (participants.length == 0) { /* redirect to home after browser refresh */
      //navigate("/");
    }
  }, []);

  const validateAndSetCurrentWord = (word: string) => {
    const wordRegex = /^$|[a-zA-Z]/g;
    if (wordRegex.test(word)) {
      setCurrentWord(word);
    }
  };

  const handleSubmit = () => {
    if (currentWord == "") {
      setErrorMessage("Mindestens ein Buchstabe notwendig");

      return;
    }

    if (words.includes(currentWord.toLowerCase())) {
      setErrorMessage("Wort wurde bereits genannt");

      return;
    }

    setCurrentWord("");
    setErrorMessage("");
    setWords([...words, currentWord.toLowerCase()]);
  };

  return (
    <div id="game">
      <div id="game-body">
        <div className="game-headline">Finde Wörter mit dem</div>
        <div className="game-headline">Anfangsbuchstaben {letter}</div>
        <p id="game-current-participant-headline"><span id="game-current-participant-name">{participants[currentParticipantIndex]}</span>, du bist dran!</p>
        <input id="game-word-input" type="text" placeholder="Wort" value={currentWord} onChange={event => validateAndSetCurrentWord(event.target.value)} />
        <div id="game-error">{errorMessage}</div>
        <button id="game-submit-button" onClick={handleSubmit}>Fertig</button>
        <button id="game-words-button">Genannte Wörter</button>
        <button id="game-restart-button">Neustart</button>
      </div>
    </div>
  );
};
