import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LETTERS } from "./types";
import { LetterContainer } from "./LetterContainer";
import { GameSettingsProps } from "./types";
import "./GameSettings.css";

export const GameSettings = ({selectedLetter, setSelectedLetter, timer, setTimer, verifyWords, setVerifyWords, participants}: GameSettingsProps) => {
  const navigate = useNavigate();
  let letterGroups: string[][] = [];

  useEffect(() => {
    if (participants.length == 0) { /* redirect to home after browser refresh */
      navigate("/");
    }
  }, []);

  let j = -1; /* partition the letters for view */
  for (let i = 0; i < LETTERS.length; i++) {
    if (i % 6 == 0) {
      j++;
      letterGroups.push([]);
    }

    letterGroups[j].push(LETTERS[i]);
  }

  const selectRandomLetter = () => {
    const min = 0;
    const max = 28;
    const randomLetterIndex = Math.floor(Math.random() * (max - min + 1) + min);

    setSelectedLetter(LETTERS[randomLetterIndex]);
  };

  const validateAndSetTimer = (timer: string) => {
    let timerAsNumber: number = Number(timer);

    if (Number.isNaN(timerAsNumber)) {
      return;
    }

    timerAsNumber = Math.floor(timerAsNumber);

    if (timerAsNumber == 0) {
      setTimer(null);

      return;
    }

    setTimer(timerAsNumber);
  };

  return (
    <div id="game-settings">
      <div id="game-settings-body">
        <p id="game-settings-headline">Spieleinstellungen</p>
        <div id="game-settings-letter-headline">Buchstabe auswählen</div>
        <div>
          {letterGroups.map((letterGroup: string[], index: number) => <LetterContainer key={index} letters={letterGroup} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />)}
        </div>
        <button id="game-settings-letter-random-button" onClick={selectRandomLetter}>ZUFÄLLIG</button>
        <div id="game-settings-timer-headline">Timer (optional)</div>
        <input id="game-settings-timer-input" type="text" placeholder="Timer in sec" value={timer ?? ""} onChange={event => validateAndSetTimer(event.target.value)} />
        <div id="game-settings-verify-word-headline">Existenzprüfung von Wörtern</div>
        <div id="game-settings-verify-words-checkbox-container">
          <input id="game-settings-verify-words-checkbox" type="checkbox" defaultChecked={verifyWords} onChange={() => setVerifyWords(!verifyWords)} />
        </div>
        <button id="game-settings-continue-button" onClick={() => navigate("/game")}>SPIEL BEGINNEN</button>
      </div>
    </div>
  );
};
