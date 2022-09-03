export type GameProps = {
    letter: string,
    participants: string[],
    timer: number | null,
    resetGame: () => void
};

export type WordProps = {
    word: string
};
