import React from "react";
import { LetterProps } from "./types";

export const Letter = ({letter, selected, setSelected}: LetterProps) => {
    return (
        <div 
            className="game-settings-letter" 
            style={{borderWidth: selected ? "3px" : "1px", fontWeight: selected ? "bold" : "normal"}}
            onClick={setSelected}
        >{letter}</div>
    );
};
