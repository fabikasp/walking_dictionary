import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { letters } from "./types";
import { Letter } from "./Letter";
import "./LetterSelection.css";

export const LetterSelection = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // TODO: sämtliche props in types file auslagern

  return (
    <div id="letter-selection">
      <div id="letter-selection-body">
        <p id="letter-selection-headline">Buchstabe festlegen</p>
        <div id="letter-selection-letters">
          {letters.map((letter, index) => <Letter key={index} letter={letter} />)}
        </div>
        <div id="letter-selection-error">{errorMessage}</div>
        <button id="letter-selection-random-button">Zufällig</button>
        <button id="letter-selection-continue-button" onClick={() => navigate("/play")}>Fortfahren</button>
      </div>
    </div>
  );
};
