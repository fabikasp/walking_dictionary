import React from "react";

type LetterProps = {
    letter: string
};

export const Letter = ({letter}: LetterProps) => {  
    return (
        <div className="letter-selection-letter">
            <span>{letter}</span>
        </div>
    );
};
