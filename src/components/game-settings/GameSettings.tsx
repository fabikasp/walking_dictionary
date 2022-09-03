import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { letters } from "./types";
import { LetterContainer } from "./LetterContainer";
import "./GameSettings.css";

export const GameSettings = () => {
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

  return (
    <div id="game-settings">
      <div id="game-settings-body">
        <p id="game-settings-headline">Spieleinstellungen</p>
        <p id="game-settings-letter-headline">Buchstabe auswählen</p>
        <div>
          {letterGroups.map((letterGroup: string[], index: number) => <LetterContainer key={index} letters={letterGroup} />)}
        </div>
        <div id="game-settings-error">{errorMessage}</div>
        <button id="game-settings-letter-random-button">Zufällig</button>
        <button id="game-settings-continue-button" onClick={() => navigate("/play")}>Fortfahren</button>
      </div>
    </div>
  );
};
