export type GameProps = {
    letter: string,
    participants: string[],
    timer: number | null,
    resetGame: () => void,
    verifyWords: boolean,
    availableWords: string[]
};

export type Scores = {
    [participant: string]: {
        participant: string,
        score: number
    }
};

export type WordProps = {
    word: string
};

export type ScoreProps = {
    score: {
        participant: string,
        score: number
    }
};
