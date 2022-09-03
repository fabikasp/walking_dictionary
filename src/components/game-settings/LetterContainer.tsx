import React from "react";
import { Letter } from "./Letter";
import { LetterContainerProps } from "./types";

export const LetterContainer = ({letters}: LetterContainerProps) => {
    return (
        <div className="game-settings-letter-container">
            {letters.map((letter: string, index: number) => <Letter key={index} letter={letter} />)}
        </div>
    );
};
