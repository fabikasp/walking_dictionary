export type GroupSelectionProps = {
    participants: string[],
    addParticipant: (participant: string) => void,
    deleteParticipant: (index: number) => void
};

export type ParticipantProps = {
    participant: string,
    deleteParticipant: () => void
};
