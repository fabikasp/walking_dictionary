import React from "react";
import { WordProps } from "./types";

export const Word = ({word}: WordProps) => {
    return <div className="game-word">{word}</div>;
};
