import React from "react";
import { ScoreProps } from "./types";

export const Score = ({score}: ScoreProps) => {
    return <div className="game-score">{score.participant}: {score.score}</div>;
};
