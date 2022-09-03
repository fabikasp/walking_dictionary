import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { letters } from "./types";
import { LetterContainer } from "./LetterContainer";
import { GameSettingsProps } from "./types";
import "./GameSettings.css";

export const GameSettings = ({selectedLetter, setSelectedLetter}: GameSettingsProps) => {
  const [errorMessage, setErrorMessage] = useState("");
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

  return (
    <div id="game-settings">
      <div id="game-settings-body">
        <p id="game-settings-headline">Spieleinstellungen</p>
        <p id="game-settings-letter-headline">Buchstabe auswählen</p>
        <div>
          {letterGroups.map((letterGroup: string[], index: number) => <LetterContainer key={index} letters={letterGroup} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />)}
        </div>
        <div id="game-settings-error">{errorMessage}</div>
        <button id="game-settings-letter-random-button" onClick={selectRandomLetter}>Zufällig</button>
        <button id="game-settings-continue-button" onClick={() => navigate("/play")}>Fortfahren</button>
      </div>
    </div>
  );
};
