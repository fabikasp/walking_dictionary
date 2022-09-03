import React from "react";
import { Letter } from "./Letter";
import { LetterContainerProps } from "./types";

export const LetterContainer = ({letters, selectedLetter, setSelectedLetter}: LetterContainerProps) => {
    return (
        <div className="game-settings-letter-container">
            {letters.map((letter: string, index: number) => <Letter key={index} letter={letter} selected={selectedLetter == letter} setSelected={() => setSelectedLetter(letter)} />)}
        </div>
    );
};
