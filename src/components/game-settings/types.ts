export const letters: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ä",
    "Ö",
    "Ü"
];

export type LetterProps = {
    letter: string,
    selected: boolean,
    setSelected: () => void
};

export type LetterContainerProps = {
    letters: string[],
    selectedLetter: string,
    setSelectedLetter: (letter: string) => void
};

export type GameSettingsProps = {
    selectedLetter: string,
    setSelectedLetter: (letter: string) => void
};
