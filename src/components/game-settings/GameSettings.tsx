import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { letters } from "./types";
import { LetterContainer } from "./LetterContainer";
import { GameSettingsProps } from "./types";
import "./GameSettings.css";

export const GameSettings = ({selectedLetter, setSelectedLetter, timer, setTimer, verifyWords, setVerifyWords}: GameSettingsProps) => {
  const navigate = useNavigate();
  let letterGroups: string[][] = [];

  let j = -1;
  for (let i = 0; i < letters.length; i++) {
    if (i % 6 == 0) {
      j++;
      letterGroups.push([]);
    }

    letterGroups[j].push(letters[i]);
  }

  const selectRandomLetter = () => {
    const min = 1;
    const max = 29;
    const randomLetterIndex = Math.floor(Math.random() * (max - min + 1) + min);

    setSelectedLetter(letters[randomLetterIndex]);
  };

  const validateAndSetTimer = (timer: string) => {
    const timerAsNumber: number = Number(timer);

    if (timerAsNumber == 0) {
      setTimer(null);

      return;
    }
    
    if (!Number.isNaN(timerAsNumber)) {
      setTimer(timerAsNumber);
    }
  };

  return (
    <div id="game-settings">
      <div id="game-settings-body">
        <p id="game-settings-headline">Spieleinstellungen</p>
        <div id="game-settings-letter-headline">Buchstabe auswählen</div>
        <div>
          {letterGroups.map((letterGroup: string[], index: number) => <LetterContainer key={index} letters={letterGroup} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />)}
        </div>
        <button id="game-settings-letter-random-button" onClick={selectRandomLetter}>Zufällig</button>
        <div id="game-settings-timer-headline">Timer</div>
        <input id="game-settings-timer-input" type="text" placeholder="Timer in sec" value={timer ?? ""} onChange={event => validateAndSetTimer(event.target.value)} />
        <div id="game-settings-verify-word-headline">Wortüberprüfung</div>
        <div id="game-settings-verify-words-checkbox-container">
          <input id="game-settings-verify-words-checkbox" type="checkbox" defaultChecked={verifyWords} onChange={() => setVerifyWords(!verifyWords)} />
        </div>
        <button id="game-settings-continue-button" onClick={() => navigate("/play")}>Fortfahren</button>
      </div>
    </div>
  );
};
