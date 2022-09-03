import React from "react";
import { LetterProps } from "./types";

export const Letter = ({letter}: LetterProps) => {  
    return (
        <div className="game-settings-letter">
            <span>{letter}</span>
        </div>
    );
};
