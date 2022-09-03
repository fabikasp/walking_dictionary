import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameProps } from "./types";
import "./Game.css";

export const Game = ({letter, participants, timer, resetGame}: GameProps) => {
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (participants.length == 0) { /* redirect to home after browser refresh */
      //navigate("/");
    }

    if (timer != null) {
      setSeconds(timer);
    }
  }, []);

  useEffect(() => {
    if (timer != null) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      if (seconds <= 0) {
        setSeconds(timer);

        if (currentParticipantIndex < participants.length - 1) {
          setCurrentParticipantIndex(currentParticipantIndex => currentParticipantIndex + 1);
        } else {
          setCurrentParticipantIndex(0);
        }
      }
  
      return () => clearInterval(interval);
    }
  }, [seconds]);

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

    if (currentWord.charAt(0) != letter) {
      setErrorMessage("Wort muss mit " + letter + " anfangen");

      return;
    }

    if (words.includes(currentWord.toLowerCase())) {
      setErrorMessage("Wort wurde bereits genannt");

      return;
    }

    setCurrentWord("");
    setErrorMessage("");

    if (timer != null) {
      setSeconds(timer);
    }

    if (currentParticipantIndex < participants.length - 1) {
      setCurrentParticipantIndex(currentParticipantIndex => currentParticipantIndex + 1);
    } else {
      setCurrentParticipantIndex(0);
    }

    setWords([...words, currentWord.toLowerCase()]);
  };

  const handleRestart = () => {
    resetGame();

    navigate("/group-selection");
  };

  return (
    <div id="game">
      <div id="game-body">
        <div className="game-headline">Finde Wörter mit dem</div>
        <div className="game-headline">Anfangsbuchstaben {letter}</div>
        <div id="game-current-participant-name">{participants[currentParticipantIndex]},</div>
        <div id="game-current-participant-headline">du bist dran!</div>
        {timer != null && <div id="game-timer">{seconds}</div>}
        <input id="game-word-input" type="text" placeholder="Wort" value={currentWord} onChange={event => validateAndSetCurrentWord(event.target.value)} />
        <div id="game-error">{errorMessage}</div>
        <button id="game-submit-button" onClick={handleSubmit}>Fertig</button>
        <button id="game-words-button">Genannte Wörter</button>
        <button id="game-restart-button" onClick={handleRestart}>Neustart</button>
      </div>
    </div>
  );
};
